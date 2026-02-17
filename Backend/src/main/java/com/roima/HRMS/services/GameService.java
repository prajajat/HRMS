package com.roima.HRMS.services;


import com.roima.HRMS.componets.StatusType;
import com.roima.HRMS.dtos.request.GameBookingDTO;
import com.roima.HRMS.dtos.response.BasicResponse;
import com.roima.HRMS.entites.*;
import com.roima.HRMS.repos.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.sql.Date;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameService {
    private final GameBookingRepository gameBookingRepository;
    private final GameSlotRepository gameSlotRepository;
    private final GameRepository gameRepository;
    private final GameQueueRepository gameQueueRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper ;

    public BasicResponse createBooking(GameBookingDTO dto)
    {
        User createdBy=findUserById(dto.getCreatedBy());
        List<GameSlot> gameSlots=dto.getGameSlots()!=null ?
        dto.getGameSlots().stream().map(gameSlotId-> findGameSlotById(gameSlotId)).toList():new ArrayList<>();
        List<User> players=dto.getAllPlayers()!=null?dto.getAllPlayers().stream().map(p->findUserById(p)).toList():new ArrayList<>();
        Game game=findGameById(dto.getCreatedBy());

        if(!createdBy.getInerestedGames().contains(game))
        {
            throw new RuntimeException("user not have this game as interested");
        }

        if(!players.contains(createdBy))
        {
            throw new RuntimeException("user can't book slot for others");
        }
        // check max slot per booking
        if(game.getMaxSlotPerBooking()<gameSlots.size())
        {
            throw new RuntimeException("Max slot is exceeded per booking.");
        }

        if(players.size()>game.getMaxPlayerPerSlot())
        {
            throw new RuntimeException("Max player is exceeded per booking.");
        }

        //check all req slot status
        gameSlots.forEach(gameSlot -> {
            if(isBeforeMaxLimitBookDayAllow(gameSlot.getDate(),game.getMaxDayOfBookingAllow()))
            {
                throw new RuntimeException("player can't book early then"+game.getMaxDayOfBookingAllow()+" days.");
            }
            else if(gameSlot.getSlotStatus().equals(StatusType.BookingStatus.BOOKED))
            {
                throw new RuntimeException(" slot is not avialable");
            }
            else if(
                    gameSlot.getDate().before(game.getCycleStartDate()) ||
                    gameSlot.getDate().after(game.getCycleEndDate()))
            {

                throw new RuntimeException(" Cycle either not started or you can't book early");
            }
            else if(createdBy.getGameBookings().stream()
                    .anyMatch(
                            x->x.getGameSlots().stream().anyMatch(
                                    s->s.getDate().equals(gameSlot.getDate())
                                            && x.getGame().equals(game)
                            )
                    ))
            {
                throw new RuntimeException(" you already have booking for "+game.getGameName()+" game and date");
            }

        });

       //check for are they can book direct
        boolean played=players.stream().anyMatch(x->isPlayedInCycle(x,game));
        log.info("played {}",played);
        // mapping data
        GameBooking gameBooking=new GameBooking();
        gameBooking.setCreatedBy(createdBy);
        gameBooking.setGameSlots(gameSlots);
        gameBooking.setParticipants(players);
        gameBooking.setGame(game);
        List<GameQueue> gameQueues=new ArrayList<>();
        // update queue
        if(played){
            players.forEach(x->{
                    updateQueue(x,game,true,0);
                    gameQueues.add(findGameQueueByPlayerAndGame(x,game));
            });
            gameBooking.setStatus(StatusType.BookingStatus.QUEUED);
            log.info("queued");
        }
        else{
            players.forEach(x->{
                updateQueue(x,game,false,1);
                gameQueues.add(findGameQueueByPlayerAndGame(x,game));
            });

            gameBooking.setStatus(StatusType.BookingStatus.BOOKED);
            log.info("booked");
            gameSlots.forEach(x->x.setSlotStatus(StatusType.BookingStatus.BOOKED));
            gameSlotRepository.saveAll(gameSlots);

        }

        gameBooking.setGameQueues(gameQueues);
        gameBookingRepository.save(gameBooking);

      return new BasicResponse("Booking created successfully");
    }



    public List<GameSlot> findAllAvailableSlotToAssign()
    {
         return gameSlotRepository.findBySlotStatus(StatusType.BookingStatus.PENDING).stream().filter(
                 gs->
                 !gs.getSlotStartTime().toLocalTime().isBefore(LocalTime.now())&&
                         !gs.getSlotStartTime().toLocalTime().isAfter(LocalTime.now().plusMinutes(30))
                       && gs.getDate().toLocalDate().equals(LocalDate.now())
                 ).toList();

    }

    public GameQueue findPlayerToAssignSlot(List<User> allCanceller,Game game)
    {
         List<GameQueue> allPlayer=gameQueueRepository.findByGameAndIsActive(game,true);
             allPlayer
                .sort(
                        Comparator.comparingInt((GameQueue b)->b.getTotalPlayedInCycle()+b.getPenalty())
                                .thenComparing(GameQueue::getQueueTime)
                );
             return allPlayer.stream().filter( e->!allPlayer.contains(e))
                     .findFirst().orElse(allPlayer.get(0));

    }


  public void assignSlot() {
      log.info("  auto :assign slot runing");
      List<GameSlot> gameSlotList =  findAllAvailableSlotToAssign();
      log.info("auto : slot found{}",gameSlotList.size());
      gameSlotList.forEach(x -> {
          GameQueue gameQueue = findPlayerToAssignSlot(x.getCancellers(), x.getGame());
          log.info(" auto :player found{}",gameQueue.getPlayer().getUserName());
          if (gameQueue != null) {
              GameBooking gameBooking = new GameBooking();
              gameBooking.setGameSlots(Collections.singletonList(x));
              gameBooking.setParticipants(gameQueue.getGameBooking().getParticipants());
              gameBooking.setGame(x.getGame());
              gameBooking.setStatus(StatusType.BookingStatus.BOOKED);
              x.setSlotStatus(StatusType.BookingStatus.BOOKED);

              gameQueue.getGameBooking().getParticipants().forEach(
                     player->
                     updateQueue(player,x.getGame(),false,1)
              );

              gameBookingRepository.save(gameBooking);
              x.setGameBooking(gameBooking);
              gameSlotRepository.save(x);
              log.info(" auto : assign slot to:{} {}",x.getGameSlotId(),gameQueue.getPlayer().getUserName());
          }
      });
  }

    public BasicResponse cancellSlot(Long bookId)
    {

        GameBooking gameBooking=findGameBookingById(bookId);
        List<GameSlot> gameSlots=gameBooking.getGameSlots();
        //update slot
        gameSlots.forEach(gs-> {
                    gs.getCancellers().addAll(gameBooking.getParticipants());
                    gs.setSlotStatus(StatusType.BookingStatus.PENDING);
                });


        //update booking
        gameBooking.setStatus(StatusType.BookingStatus.CANCELLED);

        //update queue
        gameBooking.getParticipants().forEach(
                player->
                        updateQueue(player,gameBooking.getGame(),false,gameSlots.size()*-1)
        );

        gameBookingRepository.save(gameBooking);
        gameSlotRepository.saveAll(gameSlots);

          return new BasicResponse("slot cancelled successfully");
    }


    //functions
    public boolean isBeforeMaxLimitBookDayAllow(Date date, int maxDayDiff) {

        LocalDate today = LocalDate.now();
        try {
            LocalDate givenDate =
                    date.toLocalDate();
            log.info("ok{}", ChronoUnit.DAYS.between(today, givenDate));
            return ChronoUnit.DAYS.between(today, givenDate) >= maxDayDiff;
        }catch (Exception e)
        {
            log.info("error{}",e);
        }
       return false;
    }
    public void updateQueue(User player,Game game,Boolean activeStatus,Integer changeInTotalPlayedInCycle)
    {
        GameQueue gameQueue=findGameQueueByPlayerAndGame(player,game);
        gameQueue.setIsActive(activeStatus);
        gameQueue.setTotalPlayedInCycle(
                Math.max(
                        gameQueue.getTotalPlayedInCycle()+changeInTotalPlayedInCycle,0));
         gameQueueRepository.save(gameQueue);
    }
    public boolean isPlayedInCycle(User player,Game game)
    {
         GameQueue gameQueue=findGameQueueByPlayerAndGame(player,game);
         return !gameQueue.getTotalPlayedInCycle().equals(0);
    }

    public User findUserById(Long id)
    {
        return userRepository.findById(id).orElseThrow(()-> new RuntimeException("user not found"));
    }
    public Game findGameById(Long id)
    {
        return gameRepository.findById(id).orElseThrow(()-> new RuntimeException("game not found"));
    }

    public GameQueue findGameQueueByPlayerAndGame(User player,Game game) {
        return player.getGameQueues().stream().filter(
                x -> x.getPlayer().getUserId().equals(player.getUserId())
                        &&
                        x.getGame().getGameId().equals(game.getGameId())

        ).findFirst().orElseThrow(() -> new RuntimeException("no queue Found for "+player.getUserName()+" player"));

    }
    public GameBooking findGameBookingById(Long id)
    {
        return gameBookingRepository.findById(id).orElseThrow(()-> new RuntimeException("game booking not found"));
    }

    public GameSlot findGameSlotById(Long id)
    {
        return gameSlotRepository.findById(id).orElseThrow(()-> new RuntimeException("game slot not found"));
    }
}
