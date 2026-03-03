package com.roima.HRMS.services;


import com.roima.HRMS.components.StatusType;
import com.roima.HRMS.dtos.request.GameBookingDTO;
import com.roima.HRMS.dtos.request.GameConfigDTO;
import com.roima.HRMS.dtos.request.GameInterestDTO;
import com.roima.HRMS.dtos.response.*;
import com.roima.HRMS.entities.*;
import com.roima.HRMS.repos.*;
import com.roima.HRMS.util.MailTemplateUtil;
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
import java.util.concurrent.atomic.AtomicBoolean;
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
    private final EmailService emailService;
    private String gameUpdateMsg="Game booking Update";


    public List<GameResponseDTO> getAllGame(Long userId)
    {
        User user=findUserById(userId);
        List<Long> userInterestedGameIds =user.getInterestedGames().stream().map(Game::getGameId).toList();
        List<Game> gameList=gameRepository.findAll();
        List<GameResponseDTO> gameDTOs= gameList.stream().map(a ->
                modelMapper.map(a, GameResponseDTO.class)
        ).collect(Collectors.toList());

        gameDTOs.forEach(
                gameDTO -> {
                    if(userInterestedGameIds.contains(gameDTO.getGameId()))
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

         Game game= findGameById(dto.getGame());
         User user=findUserById(dto.getUserId());

         if(user.getInterestedGames().contains((game)))
         {
              game.getInterestedPlayers().remove(user);
         }
         else{
             game.getInterestedPlayers().add(user);

             boolean presentInQueue=gameQueueRepository.existsByGameAndPlayer(game,user);
             if(!presentInQueue)
             {
                 GameQueue gameQueue=new GameQueue();
                 gameQueue.setPenalty(0);
                 gameQueue.setTotalPlayedInCycle(0);
                 gameQueue.setIsActive(false);
                 gameQueue.setPlayer(user);
                 gameQueue.setGame(game);
                 gameQueueRepository.save(gameQueue);
             }
         }

        gameRepository.save(game);
         log.info("Update game interest :{}  for : {}",game.getGameId(),user.getUserId());
         return new BasicResponse("game interest update successfully");
     }
    public GameResponceWithSlotAndBookingDTO getGameById(Long gameId, Long userId)
    {

        Game game=findGameById(gameId);
        User user=findUserById(userId);
        List<Long> userInterestedGameIds =user.getInterestedGames().stream().map(g->g.getGameId()).toList();
        GameResponceWithSlotAndBookingDTO dto=modelMapper.map(game, GameResponceWithSlotAndBookingDTO.class);
         if(userInterestedGameIds.contains(dto.getGameId()))
         {
             dto.setPlayerInterested(true);
         }
         else dto.setPlayerInterested(false);

         List<GameBooking> gameBookings=new ArrayList<>(gameBookingRepository.findByGame(game).stream().filter(
                 gameBooking ->
                     gameBooking.getParticipants().contains(user)
                    ).toList());

            gameBookings.sort(Comparator.comparing(GameBooking::getGameBookingId).reversed());
         dto.setGameBookings(gameBookings.stream().map(
                 gameBooking -> modelMapper.map(gameBooking, GameBookingResponseDTO.class)).toList()
         );

         List<GameSlot> gameSlots=gameSlotRepository.findByDateGreaterThanEqualAndDateLessThanEqualAndGame(
                 Date.valueOf(LocalDate.now()),
                 Date.valueOf(LocalDate.now().plusDays(game.getMaxDayOfBookingAllow()

                 )), game);
         dto.setGameSlots(gameSlots.stream().map(
                 gs->modelMapper.map(gs, GameSlotResponseDTO.class)
         ).toList()
         );
         GameSlot upcomingSlot=gameSlots.stream().filter(
                 gs->gs.getSlotStartTime().toLocalTime().isAfter(LocalTime.now())
                          &&
                         gs.getSlotStartTime().toLocalTime().isBefore(LocalTime.now().plusMinutes(30))
         ).findFirst().orElse(null);
         dto.setUpcomingSlot(modelMapper.map(upcomingSlot,GameSlotResponseDTO.class));
         if(upcomingSlot!=null && upcomingSlot.getSlotStatus().equals(StatusType.BookingStatus.BOOKED))
         {
             upcomingSlot.getCurrentGameBookings().stream().filter(gb -> gb.getStatus().equals(StatusType.BookingStatus.BOOKED))
                     .findFirst()
                     .ifPresent(
                             upcomingBooking -> dto.setUpcomingPlayers(
                                     upcomingBooking.getParticipants().stream().map(player ->
                                        modelMapper.map(player, UserResponceBaseDTO.class)
                                        ).toList()
                                     )
                     );
         }
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
         log.info("Update game config :{}",game.getGameId());
         return new BasicResponse("config updated successfully");
     }





    @Transactional
    public BasicResponse createBooking(GameBookingDTO dto)
    {
        User createdBy=findUserById(dto.getCreatedBy());

        List<GameSlot> gameSlots=dto.getGameSlots()!=null
                ? dto.getGameSlots().stream().map(this::findGameSlotById).toList()
                :new ArrayList<>();

        List<User> players=dto.getAllPlayers()!=null
                ?dto.getAllPlayers().stream().map(this::findUserById).toList()
                :new ArrayList<>();


        Game game=findGameById(dto.getGameId());

        AtomicBoolean slotBooked= new AtomicBoolean(false);

        if(!createdBy.getInterestedGames().contains(game))
        {
            log.info("user not have this game as interested");
            throw new RuntimeException("user not have this game as interested");
        }

        if(!players.contains(createdBy))
        {
            log.info("user can't book slot for others");
            throw new RuntimeException("user can't book slot for others");
        }
        // check max slot per booking
        if(game.getMaxSlotPerBooking()<gameSlots.size())
        {
            log.info("Max slot is exceeded per booking.");
            throw new RuntimeException("Max slot is exceeded per booking.");
        }

        if(players.size()>game.getMaxPlayerPerSlot())
        {
            log.info("Max player is exceeded per booking.");
            throw new RuntimeException("Max player is exceeded per booking.");
        }

        //check all req slot status
        gameSlots.forEach(gameSlot -> {
            if(isBeforeMaxLimitBookDayAllow(gameSlot.getDate(),game.getMaxDayOfBookingAllow()))
            {
                log.info("player can't book early then{} days.", game.getMaxDayOfBookingAllow());
                throw new RuntimeException("player can't book early then"+game.getMaxDayOfBookingAllow()+" days.");
            }
            else if(gameSlot.getSlotStatus().equals(StatusType.BookingStatus.BOOKED))
            {
                slotBooked.set(true);
            }
            else if(
                    gameSlot.getDate().before(game.getCycleStartDate()) ||
                    gameSlot.getDate().after(game.getCycleEndDate()))
            {
                log.info("Cycle either not started or you can't book early");
                throw new RuntimeException(" Cycle either not started or you can't book early");
            }
            else if(LocalTime.now().isAfter(gameSlot.getSlotStartTime().toLocalTime())||gameSlot.getSlotStatus().equals(StatusType.BookingStatus.EXPIRED))
            {
                log.info("Slot is expired now, you are late");
                throw new RuntimeException("Slot is expired now, you are late");
            }
//            else if(createdBy.getGameBookings().stream()
//                    .anyMatch(
//                            x->x.getBookingSlots().stream().anyMatch(
//                                    s->{  log.info(" {}-{}-{}-{}",s.getDate(),gameSlot.getDate(),x.getGame().getGameId(),game.getGameId());
//                                        return s.getDate().equals(gameSlot.getDate())
//                                            && x.getGame().equals(game)
//                                             && (
//                                                     x.getStatus().equals(StatusType.BookingStatus.BOOKED)
//                                                             ||
//                                                x.getStatus().equals(StatusType.BookingStatus.QUEUED));
//                                    }
//                            )
//                    ))
//            {
//                throw new RuntimeException(" you already have booking for "+game.getGameName()+" game and date");
//            }

        });


       //check for are they can book direct
        boolean played=players.stream().anyMatch(x->isPlayedInCycle(x,game));
        log.info("Did they played in this cycle ? - {}",played);

        // mapping data

        GameBooking gameBooking=new GameBooking();
        gameBooking.setCreatedBy(createdBy);
        gameBooking.setBookingSlots(gameSlots);
        gameBooking.setParticipants(players);
        gameBooking.setGame(game);
        List<GameQueue> gameQueues=new ArrayList<>();

        // update queue
        if(played||slotBooked.get()){
            players.forEach(x->{
                    updateQueue(x,game,true,0);
                    gameQueues.add(findGameQueueByPlayerAndGame(x,game));
            });
            gameBooking.setStatus(StatusType.BookingStatus.QUEUED);
            log.info("Game booking is in queued state");
        }
        else{
            players.forEach(x->{
                updateQueue(x,game,false,1);
                gameQueues.add(findGameQueueByPlayerAndGame(x,game));
            });

            gameBooking.setStatus(StatusType.BookingStatus.BOOKED);
            log.info("Game booking is in booked state");
            gameSlots.forEach(x->x.setSlotStatus(StatusType.BookingStatus.BOOKED));
        }


        List<String> allPlayerMails=players.stream().map(
                User::getCompanyEmail
        ).toList();
        String emailBody = MailTemplateUtil.gameBookingEmailTemplate(game.getGameName(), createdBy.getUserName(), gameBooking.getStatus().toString());

        emailService.sendMail(allPlayerMails , "Game ", emailBody);


        gameBooking.setGameQueues(gameQueues);
        gameBookingRepository.save(gameBooking);
        gameSlots.forEach(x->x.getCurrentGameBookings().add(gameBooking));
        gameSlotRepository.saveAll(gameSlots);

        Notification notification=new Notification();
        notification.setDescription("Your booking for "+game.getGameName()+"("+gameBooking.getGameBookingId()+")is "+gameBooking.getStatus()+" right now." );
        notification.setTitle(gameUpdateMsg);
        notification.setUser(createdBy);
        notificationRepository.save(notification);

        if(slotBooked.get()||played)
        {
            gameQueues.forEach(x-> x.setGameBooking(gameBooking));
        }
        gameQueueRepository.saveAll(gameQueues);
        log.info("Created game booking :{}",gameBooking.getGameBookingId());
      return new BasicResponse("Booking created successfully");
    }


   @Transactional
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

    @Transactional
    public GameQueue findPlayerToAssignSlot( GameSlot gameSlot)
    {
        List<GameQueue> allPlayer= new ArrayList<>(
                gameQueueRepository.findByGameAndIsActive(gameSlot.getGame(), true)
                        .stream()
                        .filter(
                        x -> x.getGameBooking().getBookingSlots().stream().anyMatch(gs->gs.getGameSlotId().equals(gameSlot.getGameSlotId()))
                )
                .toList());
        log.info("auto - find player - all player size{}",allPlayer.size());
        allPlayer=new ArrayList<>(allPlayer.stream().filter( e->!gameSlot.getCancellers().contains(e.getPlayer())).toList());

        log.info("auto - find player - all player size{}",allPlayer.size());


        if(allPlayer.isEmpty()) {
            log.info("auto - find player - no player found");
            return null;
        }

             allPlayer
                .sort(
                        Comparator.comparingDouble(
                                (GameQueue b)->{
                                    List<GameQueue> playersQueue=b.getGameBooking().getParticipants().stream().map(p->findGameQueueByPlayerAndGame(p,gameSlot.getGame())).toList();
                                    int totalPlayedAsTeam = playersQueue.stream()
                                            .map(GameQueue::getTotalPlayedInCycle)
                                            .reduce(0, Integer::sum);

                                    int totalPenaltyAsTeam = playersQueue.stream()
                                            .map(GameQueue::getPenalty)
                                            .reduce(0, Integer::sum);
                                     if(playersQueue.isEmpty()){return 0;}
                                    return (double) (totalPlayedAsTeam + totalPenaltyAsTeam) /playersQueue.size();
                                })
                                .thenComparing(GameQueue::getQueueTime)
                );
            log.info("auto - find player - first player : {}",allPlayer.get(0).getPlayer().getUserName());
             AtomicReference<Boolean> played= new AtomicReference<>(false);
             allPlayer.get(0).getGameBooking().getGameQueues().forEach(
                     gq-> {
                         if (gq.getTotalPlayedInCycle() != 0) played.set(true);
                     }
                     );

             if(!gameSlot.getSlotStartTime().toLocalTime().isBefore(LocalTime.now().plusMinutes(30))&&played.get()) {
                 log.info("auto - find player - no fresh player found or too early to assign");
                 return null;
             }else{
                 log.info("auto - player found : {}", allPlayer.get(0).getPlayer().getUserName());
                 return allPlayer.get(0);
             }
    }

     public void assignSlot()
     {
         log.info("auto - assign slot - assign slot running");
         List<GameSlot> gameSlotList =  findAllAvailableSlotToAssign();
         assignKnownSlot(gameSlotList);
     }

    @Transactional
    public void assignKnownSlot(List<GameSlot> gameSlotList)
    {

          log.info("auto - assign slot - slot found : {}",gameSlotList.size());
          gameSlotList.forEach(x -> {

                  if(x.getSlotStatus().equals(StatusType.BookingStatus.BOOKED))return;
                  GameQueue gameQueue = findPlayerToAssignSlot(x);
                  if(gameQueue==null) return;
                  log.info("auto - assign slot -  slot : {} - player found :{}",x.getGameSlotId(),gameQueue.getPlayer().getUserName());
                  if (gameQueue != null) {

                      GameBooking gameBooking = gameQueue.getGameBooking();
                      gameBooking.setParticipants(new ArrayList<>(gameQueue.getGameBooking().getParticipants()));
                      gameBooking.setGame(x.getGame());
                      gameBooking.setStatus(StatusType.BookingStatus.BOOKED);
                      x.setSlotStatus(StatusType.BookingStatus.BOOKED);

                      Notification notification=new Notification();
                      notification.setDescription("your booking for "+gameQueue.getGame().getGameName()+" is "+gameBooking.getStatus()+" right now." );
                      notification.setTitle(gameUpdateMsg);
                      notification.setUser(gameQueue.getPlayer());
                      notificationRepository.save(notification);
                      gameQueue.getGameBooking().getParticipants().forEach(
                             player->
                              updateQueue(player,x.getGame(),false,1)
                              );

                      gameBookingRepository.save(gameBooking);
                      if(!x.getCurrentGameBookings().contains(gameBooking)) {
                          x.getCurrentGameBookings().add(gameBooking);
                      }
                      gameSlotRepository.save(x);
                      log.info("auto - assign slot -  slot : {} - assign to :{}",x.getGameSlotId(),gameQueue.getPlayer().getUserName());
                  }
      });
  }

    @Transactional
    public BasicResponse cancelSlot(Long bookingId)
    {
        log.info("Cancel game booking starting : {}",bookingId);
        GameBooking gameBooking= findGameBookingById(bookingId);
        List<GameSlot> gameSlots=new ArrayList<>(gameBooking.getBookingSlots());

        //update slot
        gameSlots.forEach(gs-> {
                    if(gs.getSlotStartTime().toLocalTime().isBefore(LocalTime.now()))
                    {
                        log.info("you miss cancel slot time, slot is already started : {}",bookingId);
                        throw new RuntimeException("you miss cancel slot time, slot is already started");
                    }
                    if(gs.getSlotStatus().equals(StatusType.BookingStatus.BOOKED)&& gameBooking.getStatus().equals((StatusType.BookingStatus.BOOKED))) {
                        gs.getCancellers().addAll(gameBooking.getParticipants());
                        gs.setSlotStatus(StatusType.BookingStatus.PENDING);
                    }
                });

        int change=gameBooking.getStatus().equals(StatusType.BookingStatus.BOOKED)?gameSlots.size()*-1:0;
        //update booking
        gameBooking.setStatus(StatusType.BookingStatus.CANCELLED);

        Notification notification=new Notification();
        notification.setDescription("your booking for "+gameBooking.getGame().getGameName()+" is "+gameBooking.getStatus()+" right now." );
        notification.setTitle(gameUpdateMsg);
        notification.setUser(gameBooking.getCreatedBy());
        notificationRepository.save(notification);

        //update queue

        gameBooking.getParticipants().forEach(
                player->
                        updateQueue(player,gameBooking.getGame(),false,change)
        );

        gameBookingRepository.save(gameBooking);
        gameSlotRepository.saveAll(gameSlots);
        log.info("Call - auto - auto assign : {}",bookingId);
        assignKnownSlot(gameSlots);
        log.info("Finish call - auto - auto assign : {}",bookingId);
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
                            log.info("auto - generate slot - New Slots- Game : {}, Day : {}, Cycle Start Date : {}", game.getGameName(), i, game.getCycleStartDate());
                        }
                    }else  log.info("auto - generate slot - Present Slots -Game : {}, Cycle Start Date : {}, Cycle End Date : {}", game.getGameName(), game.getCycleStartDate(),game.getCycleEndDate());
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
                         int days=(int) Math.ceil(110/perDayMaxPlayerGotChance);
                         int totalDayNeeded=0;
                         int calenderDays=0;
                         if(game.getIsOpenForWeekend())
                         {
                             totalDayNeeded=days;
                         }else {
                             int weekDaysCount=0;
                              while(weekDaysCount<days){
                                 DayOfWeek day= LocalDate.now().plusDays(calenderDays).getDayOfWeek();
                                 if (day != DayOfWeek.SATURDAY &&
                                         day!= DayOfWeek.SUNDAY ) {
                                     weekDaysCount++;
                                 }
                                 calenderDays++;
                             }
                              totalDayNeeded=calenderDays;
                         }
                         endDate=Date.valueOf(LocalDate.now().plusDays(totalDayNeeded-1));



                         game.setCycleStartDate(startDate);
                         game.setCycleEndDate(endDate);
                          log.info("auto - update cycle- Time per day : {},Max player per day : {}, Total Days need : {}",perDaytime,perDayMaxPlayerGotChance,totalDayNeeded);
                         new ArrayList<>(game.getGameQueues()).forEach(
                                 gq-> {
                                     gq.setTotalPlayedInCycle(0);
                                     gq.setIsActive(false);
                                     gq.setPenalty(0);
                                     gameQueueRepository.save(gq);

                                 }
                         );
                         log.info("auto - update cycle - Update - game : {} , Cycle Start Date : {}, Cycle End Date : {}",game.getGameName(),game.getCycleStartDate(),game.getCycleEndDate());
                         gameRepository.save(game);

                     }
                     else  log.info("auto - update cycle - Present - game : {} , Cycle Start Date : {}, Cycle End Date : {}",game.getGameName(),game.getCycleStartDate(),game.getCycleEndDate());

                });

        return isUpdate.get();
    }

    @Transactional
    public void cleanUpSlotAndBooking()
    {
        List<GameSlot> gameSlots =gameSlotRepository.findBySlotStatusAndSlotStartTimeBefore(Time.valueOf(LocalTime.now()),Date.valueOf(LocalDate.now()),Date.valueOf(LocalDate.now().minusDays(1)));
        log.info(" auto - cleanUp - total game slot : {}", gameSlots.size());
        gameSlots.forEach(
                gs-> {

                    log.info(" auto - cleanUp- game slot : {} {}",gs.getGameSlotId(),gs.getSlotStatus());
                    if(gs.getSlotStatus().equals(StatusType.BookingStatus.PENDING))
                    {
                        gs.setSlotStatus(StatusType.BookingStatus.EXPIRED);
                    }else if(gs.getSlotStatus().equals(StatusType.BookingStatus.BOOKED))
                    {

                        gs.setSlotStatus(StatusType.BookingStatus.COMPLETED);
                    }


                        List<GameBooking> gameBookings = gs.getCurrentGameBookings();
                        log.info("game booking : {}",gameBookings.size());
                        gameBookings.forEach(
                                gb -> {
                                    log.info(" auto - cleanUp -  game slot : {},game booking : {}", gs.getGameSlotId(),gb.getGameBookingId());
                                    if (gb.getStatus().equals(StatusType.BookingStatus.BOOKED)) {
                                        gb.setStatus(StatusType.BookingStatus.COMPLETED);
                                    } else if (gb.getStatus().equals(StatusType.BookingStatus.QUEUED)) {
                                        gb.setStatus(StatusType.BookingStatus.EXPIRED);
                                    }


                                    List<GameQueue> gameQueues = gb.getGameQueues();
                                    gameQueues.forEach(
                                            gq -> {
                                                log.info(" auto - cleanUp - game slot : {},game booking : {}, game queue : {}", gs.getGameSlotId(),gb.getGameBookingId(), gq.getGameQueueId());
                                                gq.setIsActive(false);
                                            }
                                    );
                                    gameQueueRepository.saveAll(gameQueues);
                                }

                        );
                        gameBookingRepository.saveAll(gameBookings);

                }
        );

        gameSlotRepository.saveAll(gameSlots);
    }

    //functions
    public boolean isBeforeMaxLimitBookDayAllow(Date date, int maxDayDiff)
    {

        LocalDate today = LocalDate.now();
        try {
            LocalDate givenDate =
                    date.toLocalDate();

            return ChronoUnit.DAYS.between(today, givenDate) >= maxDayDiff;
        }catch (Exception e)
        {
            log.info("Error in comparing date : ",e);
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
        if(Boolean.TRUE.equals(activeStatus))gameQueue.setQueueTime(LocalDateTime.now());

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
