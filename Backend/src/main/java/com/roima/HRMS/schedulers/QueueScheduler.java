package com.roima.HRMS.schedulers;


import com.roima.HRMS.services.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Component
@Slf4j
@RequiredArgsConstructor
public class QueueScheduler {

    private final GameService gameService;
    //@Scheduled(cron ="0 5,35 * * * ?")
    @Scheduled(fixedDelay = 30*60*1000)//30 min
    public void runForAssignSlot(){
        log.info("auto - assign slot scheduler - call assign slot");
        gameService.assignSlot();
    }
   // @Scheduled(cron ="0 5,35 * * * ?")
    @Scheduled(fixedDelay = 30*60*1000)//30 min
    public void runForMoveToExpired(){
        log.info("auto -clean Up scheduler - call cleanUp slot & booking");
        gameService.cleanUpSlotAndBooking();
    }

   @Scheduled(cron ="0 5 0 * * ?")
  // @Scheduled(fixedDelay = 4*60*1000)
    public void runForGenerateSlot(){
          log.info("auto -Generate scheduler - running");
        if( gameService.updateCycle()) {
            log.info("auto -Generate scheduler - Update in cycle found, now call slot generator");
            gameService.generateSlot();
        }
        else{
            log.info("auto -Generate scheduler - No update found in cycle, same slots");
        }
    }

}
