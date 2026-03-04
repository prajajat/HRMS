package com.roima.HRMS.services;



import com.roima.HRMS.components.StatusType;
import com.roima.HRMS.dtos.response.*;
import com.roima.HRMS.entities.Notification;
import com.roima.HRMS.entities.User;
import com.roima.HRMS.repos.GameRepository;
import com.roima.HRMS.repos.NotificationRepository;
import com.roima.HRMS.repos.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepo;
    private final ModelMapper modelMapper;
    private final NotificationRepository notificationRepository;
    private final GameRepository gameRepository;

    public List<UserResponseForEmailDTO> getAllUserWithNameAndEmail()
    {
        List<User> user = userRepo.findByRolesTitle("employee");
        return user.stream().map(a ->
                                                modelMapper.map(a, UserResponseForEmailDTO.class)
                                        ).collect(Collectors.toList());
    }
    public UserResponceWithManagerAndTeamDTO getUserById(Long id)
    {
        User user = findUserById(id);
        return modelMapper.map(user,UserResponceWithManagerAndTeamDTO.class);
    }

    public List<UserResponceBaseDTO> getTeamMemberByManager(Long id)
    {
        User user = findUserById(id);
        return user.getTeamMember().stream().map(
                x->modelMapper.map(x,UserResponceBaseDTO.class)
        ).toList();
    }

    public List<NotificationResponseDTO> getAllNotification(Long userId)
    {   User user=findUserById(userId);
       List<NotificationResponseDTO>  notificationResponseDTOS= new java.util.ArrayList<>(notificationRepository.findByUser(user).stream().map(
               x -> modelMapper.map(x, NotificationResponseDTO.class)
       ).toList());
       notificationResponseDTOS.sort(Comparator.comparingLong(NotificationResponseDTO::getNotificationId).reversed());

       List<Notification> notifications =notificationRepository.findByUser(user);
       notifications.forEach(
               n->n.setIsRead(true)
       );
       notificationRepository.saveAll(notifications);
       return notificationResponseDTOS;
    }

    public Long getNewNotificationCount(Long userId)
    {   User user=findUserById(userId);

        return  notificationRepository.countByUserAndIsRead(user,false);
    }

    public List<UserResponseForEmailDTO> getAllUser()
    {
       List<User> user = userRepo.findAll();

        return user.stream()
                .map(a ->
                        modelMapper.map(a, UserResponseForEmailDTO.class)
                ).toList();
    }
    public List<UserResponseForEmailDTO> getAllUserWithHrRole()
    {
        List<User> user = userRepo.findAll().stream().filter(
                 u ->u.getRoles().stream().anyMatch(
                         r->r.getTitle().equals("hr")
                 )
        ).toList();

        return user.stream()
                .map(a ->
                        modelMapper.map(a, UserResponseForEmailDTO.class)
                ).toList();
    }

    public EmployeeWithInfoResponseDTO getEmployeeInfo(Long id)
    {
         User user=findUserById(id);
         EmployeeWithInfoResponseDTO responseDTO=new EmployeeWithInfoResponseDTO();
         Map<String, Integer> map = new HashMap<>();
        gameRepository.findAll().forEach(
                game->{
                    map.put(game.getGameName(),0);
                }
        );
        user.getGameBookings().forEach(
                gb->{
                    if(gb.getStatus().equals(StatusType.BookingStatus.COMPLETED)){
                    String gameName=gb.getGame().getGameName();
                    map.put(gameName,map.get(gameName)+1);
                    }
                }
        );
         responseDTO.setGames(
                        map.entrySet().stream().map( gameMap->{
                             GameWithTotalSlotPlayedResponseDTO dto=new GameWithTotalSlotPlayedResponseDTO();
                             dto.setGameName(gameMap.getKey());
                             dto.setTotalSlotPlayed(gameMap.getValue().longValue());
                             return dto;
                         }

                 ).toList()
         );

         responseDTO.setTotalTravelAssign((long)user.getTravelers().size());
         responseDTO.setTotalJobShare((long)user.getJobShares().size());
         responseDTO.setTotalPost((long)user.getPostCreated().size());
         responseDTO.setTotalJobReferralsReviewed((long)user.getJobReviews().size());
         responseDTO.setTotalJobShare((long)user.getJobShares().size());
         responseDTO.setTotalJobReferrals((long)user.getJobRefers().size());

         return responseDTO;
    }

    public HRWithInfoResponseDTO getHRInfo(Long id)
    {
        User user=findUserById(id);
        HRWithInfoResponseDTO responseDTO=new HRWithInfoResponseDTO();
        responseDTO.setTotalJobCreated((long)user.getCreatedJobs().size());
        responseDTO.setTotalTravelCreated((long)user.getCreatedTravelDetails().size());
        responseDTO.setTotalExpenseReviewed((long)user.getTravelExpensesReviewed().size());
        return responseDTO;
    }


    public User findUserById(Long id)
    {
        return userRepo.findById(id).orElseThrow(()-> new RuntimeException("user  not found"));
    }
}
