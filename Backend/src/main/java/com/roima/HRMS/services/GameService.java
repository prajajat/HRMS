package com.roima.HRMS.services;


import com.roima.HRMS.componets.StatusType;
import com.roima.HRMS.dtos.request.GameBookingDTO;
import com.roima.HRMS.dtos.request.GameConfigDTO;
import com.roima.HRMS.dtos.request.GameInterestDTO;
import com.roima.HRMS.dtos.response.*;
import com.roima.HRMS.entites.*;
import com.roima.HRMS.repos.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.sql.Date;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

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
    private final NotificationRepository notificationRepository;

    public List<GameResponseDTO> getAllGame(Long userId)
    {
        User user=findUserById(userId);
        List<Long> userIntrestedGameIds=user.getInterestedGames().stream().map(game->game.getGameId()).toList();
        List<Game> gameList=gameRepository.findAll();
        List<GameResponseDTO> gameDTOs= gameList.stream().map(a ->
                modelMapper.map(a, GameResponseDTO.class)
        ).collect(Collectors.toList());

        gameDTOs.forEach(
                gameDTO -> {
                    if(userIntrestedGameIds.contains(gameDTO.getGameId()))
                    {
                       gameDTO.setPlayerInterested(true);
                    }
                    else gameDTO.setPlayerInterested(false);
                }

        );
        return gameDTOs;
    }
     public BasicResponse UpdateGameInterest(GameInterestDTO dto)
     {
         List<Game> gameList= dto.getGames().stream().map(x->findGameById(x))
                 .toList();
         User user=findUserById(dto.getUserId());
         user.setInterestedGames(gameList);
         return new BasicResponse("game interest update successfully");
     }
    public GameResponceWithSlotAndBookingDTO getGameById(Long gameId, Long userId)
    {

         Game game=findGameById(gameId);
        User user=findUserById(userId);
        List<Long> userIntrestedGameIds=user.getInterestedGames().stream().map(g->g.getGameId()).toList();
        GameResponceWithSlotAndBookingDTO dto=modelMapper.map(game, GameResponceWithSlotAndBookingDTO.class);
         if(userIntrestedGameIds.contains(dto.getGameId()))
         {
             dto.setPlayerInterested(true);
         }
         else dto.setPlayerInterested(false);

         List<GameBooking> gameBookings=gameBookingRepository.findByGame(game).stream().filter(
                 gameBooking ->
                     gameBooking.getParticipants().contains(user)
                    ).toList();
         dto.setGameBookings(gameBookings.stream().map(
                 gameBooking -> modelMapper.map(gameBooking, GameBookingResponseDTO.class)).toList()
         );

         List<GameSlot> gameSlots=gameSlotRepository.findByDateLessThanEqualAndDateLessThanEqualAndGame(
                 Date.valueOf(LocalDate.now()),
                 Date.valueOf(LocalDate.now().plusDays(game.getMaxDayOfBookingAllow()

                 )), game);
         dto.setGameSlots(gameSlots.stream().map(
                 gs->modelMapper.map(gs, GameSlotResponseDTO.class)
         ).toList()
         );

        return dto;

    }
    public GameConfigDTO getGameConfig(Long gameId)
    {
        Game game=findGameById(gameId);
        GameConfigDTO dto=modelMapper.map(game,GameConfigDTO.class);
        dto.setSlotEndTime(game.getSlotEndTime().toLocalTime());
        dto.setSlotStartTime(game.getSlotStartTime().toLocalTime());
        return dto;
    }
     public BasicResponse updateGameConfig(GameConfigDTO dto)
     {

         Game game=findGameById(dto.getGameId());
         modelMapper.map(dto,game);
         game.setSlotStartTime(Time.valueOf(dto.getSlotStartTime()));
         game.setSlotEndTime(Time.valueOf(dto.getSlotEndTime()));
         gameRepository.save(game);
         return new BasicResponse("config updated successfully");
     }




    @Transactional
    public BasicResponse createBooking(GameBookingDTO dto)
    {
        User createdBy=findUserById(dto.getCreatedBy());
        List<GameSlot> gameSlots=dto.getGameSlots()!=null ?
        dto.getGameSlots().stream().map(gameSlotId-> findGameSlotById(gameSlotId)).toList():new ArrayList<>();
        List<User> players=dto.getAllPlayers()!=null?dto.getAllPlayers().stream().map(p->findUserById(p)).toList():new ArrayList<>();
        Game game=findGameById(dto.getCreatedBy());

        if(!createdBy.getInterestedGames().contains(game))
        {
           // throw new RuntimeException("user not have this game as interested");
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
                //throw new RuntimeException(" you already have booking for "+game.getGameName()+" game and date");
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
        Notification notification=new Notification();
        notification.setDescription("your booking for "+game.getGameName()+" is "+gameBooking.getStatus()+" right now." );
        notification.setTitle("Game booking Update");
        notification.setUser(createdBy);
        notificationRepository.save(notification);

        gameBooking.setGameQueues(gameQueues);
        gameBookingRepository.save(gameBooking);
        gameSlots.forEach(x->x.setGameBooking(gameBooking));

      return new BasicResponse("Booking created successfully");
    }



    public List<GameSlot> findAllAvailableSlotToAssign()
    {
         return gameSlotRepository.findBySlotStatus(StatusType.BookingStatus.PENDING)
                 .stream().filter(
                 gs->
                 !gs.getSlotStartTime().toLocalTime().isBefore(LocalTime.now())&&
                         !gs.getSlotStartTime().toLocalTime().isAfter(LocalTime.now().plusMinutes(30))
                       &&
                         gs.getDate().toLocalDate().equals(LocalDate.now())
                 ).toList();

    }

    public GameQueue findPlayerToAssignSlot(List<User> allCanceller,Game game)
    {
         List<GameQueue> allPlayer=gameQueueRepository.findByGameAndIsActive(game,true);
             allPlayer
                .sort(
                        Comparator.comparingInt((GameQueue b)->b.getTotalPlayedInCycle()*50+b.getPenalty())
                                .thenComparing(GameQueue::getQueueTime)
                );
              if(allPlayer.isEmpty())  return null;
             return allPlayer.stream().filter( e->!allPlayer.contains(e))
                     .findFirst().orElse(allPlayer.get(0));

    }

    @Transactional
    public void assignSlot()
    {
      log.info("  auto :assign slot runing");
      List<GameSlot> gameSlotList =  findAllAvailableSlotToAssign();
      log.info("auto : slot found{}",gameSlotList.size());
      gameSlotList.forEach(x -> {
          GameQueue gameQueue = findPlayerToAssignSlot(x.getCancellers(), x.getGame());
          if(gameQueue==null)return;
          log.info(" auto :player found{}",gameQueue.getPlayer().getUserName());
          if (gameQueue != null) {
              GameBooking gameBooking = new GameBooking();
              gameBooking.setGameSlots(Collections.singletonList(x));
              gameBooking.setParticipants(new ArrayList<>(gameQueue.getGameBooking().getParticipants()));
              gameBooking.setGame(x.getGame());
              gameBooking.setStatus(StatusType.BookingStatus.BOOKED);
              x.setSlotStatus(StatusType.BookingStatus.BOOKED);

              Notification notification=new Notification();
              notification.setDescription("your booking for "+gameQueue.getGame().getGameName()+" is "+gameBooking.getStatus()+" right now." );
              notification.setTitle("Game booking Update");
              notification.setUser(gameQueue.getPlayer());
              notificationRepository.save(notification);
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

    @Transactional
    public BasicResponse cancelSlot(Long bookingId)
    {

        GameBooking gameBooking=findGameBookingById(bookingId);
        List<GameSlot> gameSlots=gameBooking.getGameSlots();
        //update slot
        gameSlots.forEach(gs-> {
                    if(gs.getSlotStartTime().toLocalTime().isBefore(LocalTime.now()))
                    {
                        throw new RuntimeException("you miss cancel slot time, slot is already started");
                    }
                    if(gs.getSlotStatus().equals(StatusType.BookingStatus.BOOKED)&& Objects.equals(gs.getGameBooking().getGameBookingId(), gameBooking.getGameBookingId())) {
                        gs.getCancellers().addAll(gameBooking.getParticipants());
                        gs.setSlotStatus(StatusType.BookingStatus.PENDING);
                    }
                });


        //update booking
        gameBooking.setStatus(StatusType.BookingStatus.CANCELLED);

        Notification notification=new Notification();
        notification.setDescription("your booking for "+gameBooking.getGame().getGameName()+" is "+gameBooking.getStatus()+" right now." );
        notification.setTitle("Game booking Update");
        notification.setUser(gameBooking.getCreatedBy());
        notificationRepository.save(notification);

        //update queue
        gameBooking.getParticipants().forEach(
                player->
                        updateQueue(player,gameBooking.getGame(),false,gameSlots.size()*-1)
        );

        gameBookingRepository.save(gameBooking);
        gameSlotRepository.saveAll(gameSlots);

          return new BasicResponse("slot cancelled successfully");
    }

    @Transactional
    public void generateSlot()
    {
        List<Game> games=gameRepository.findAll();
        games.forEach(
                game ->
                {
                    if(game.getCycleStartDate().toLocalDate().equals(LocalDate.now())) {
                        long days = 1 + ChronoUnit.DAYS.between(game.getCycleStartDate().toLocalDate(), game.getCycleEndDate().toLocalDate());
                        Date date = game.getCycleStartDate();
                        for (long i = 1; i <= days; i++) {
                            if (
                                    (date.toLocalDate().getDayOfWeek() == DayOfWeek.SATURDAY || date.toLocalDate().getDayOfWeek() == DayOfWeek.SUNDAY)
                                            &&
                                            !game.getIsOpenForWeekend()
                            ) {
                                date = Date.valueOf(date.toLocalDate().plusDays(1));
                                i--;
                            }

                            Time startTime = game.getSlotStartTime();
                            Time endTime = Time.valueOf(startTime.toLocalTime().plusMinutes(30));

                            while (endTime.toLocalTime().isBefore(game.getSlotEndTime().toLocalTime().plusMinutes(1))) {
                                GameSlot gameSlot = new GameSlot();
                                gameSlot.setGame(game);
                                gameSlot.setSlotStatus(StatusType.BookingStatus.PENDING);
                                gameSlot.setSlotStartTime(startTime);
                                gameSlot.setSlotEndTime(endTime);
                                gameSlot.setDate(date);
                                gameSlotRepository.save(gameSlot);
                                startTime = endTime;
                                endTime = Time.valueOf(startTime.toLocalTime().plusMinutes(30));
                            }
                            date = Date.valueOf(date.toLocalDate().plusDays(1));
                            log.info("auto : generate slot {} -{}-{}", game.getGameName(), i, game.getCycleStartDate());
                        }
                    }else  log.info("auto : have slot {} -{}-{}", game.getGameName(), game.getCycleStartDate(),game.getCycleEndDate());
                }
        );
    }

    @Transactional
    public boolean updateCycle()
    {
        List<Game> games=gameRepository.findAll();
        AtomicReference<Boolean> isUpdate= new AtomicReference<>(false);
        games.forEach(
                game ->
                {
                     if(game.getCycleEndDate().toLocalDate().isBefore(LocalDate.now()))
                     {  isUpdate.set(true);
                        Date startDate=Date.valueOf(LocalDate.now());
                        Date endDate;
                        Double perDaytime=((double) game.getSlotEndTime().getTime()- game.getSlotStartTime().getTime())/(30*60*1000);

                        Double perDayMaxPlayerGotChance=perDaytime*game.getMaxPlayerPerSlot();
                        int  days=(int) Math.ceil(110/perDayMaxPlayerGotChance);

                         endDate=Date.valueOf(LocalDate.now().plusDays(days-1));
                         


                         game.setCycleStartDate(startDate);
                         game.setCycleEndDate(endDate);
                          log.info("auto : new calulation perdaytime: {},perDayMaxPlayerGotChance: {},days{}",perDaytime,perDayMaxPlayerGotChance,days);
                         new ArrayList<>(game.getGameQueues()).forEach(
                                 gq-> {
                                     gq.setTotalPlayedInCycle(0);
                                     gq.setIsActive(false);
                                     gq.setPenalty(0);
                                     gameQueueRepository.save(gq);

                                 }
                         );
                         log.info("auto : update cycle {}-{}-{}",game.getGameName(),game.getCycleStartDate(),game.getCycleEndDate());
                         gameRepository.save(game);

                     }
                     else  log.info("auto : same cycle {}-{}-{}",game.getGameName(),game.getCycleStartDate(),game.getCycleEndDate());

                });

        return isUpdate.get();
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
        if(activeStatus)gameQueue.setQueueTime(LocalDateTime.now());
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
