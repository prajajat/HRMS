package com.roima.HRMS.Schedulers;


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

    @Scheduled(fixedDelay = 100*1000)//30 min
    public void runForAssignSlot(){
        log.info("auto call assign");
      //  gameService.assignSlot();
    }

    @Scheduled(fixedDelay = 100*1000)
    public void runForGenerateSlot(){
          log.info(" auto call  update cycle");
//        if( gameService.updateCycle()) {
//            log.info("auto call generate slot");
//            gameService.generateSlot();
//        }
//        else{
//            log.info("auto same slot");
//        }
    }

}
