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

    @Scheduled(fixedDelay = 30*60*1000)//30 min
    public void runForAssignSlot(){
        log.info("auto call assign");
        gameService.assignSlot();
    }

    @Scheduled(cron ="0 5 0 * * ?")
  // @Scheduled(fixedDelay = 4*60*1000)
    public void runForGenerateSlot(){
          log.info(" auto call  update cycle");
        if( gameService.updateCycle()) {
          log.info("auto call generate slot");
            gameService.generateSlot();
        }
        else{
            log.info("auto same slot");
        }
    }

}
