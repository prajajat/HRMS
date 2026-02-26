package com.roima.HRMS.services;



import com.roima.HRMS.dtos.response.*;
import com.roima.HRMS.entities.Notification;
import com.roima.HRMS.entities.User;
import com.roima.HRMS.repos.NotificationRepository;
import com.roima.HRMS.repos.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepo;
    private final ModelMapper modelMapper;
    private final NotificationRepository notificationRepository;

    public List<UserResponseForEmailDTO> getAllUserWithNameAndEmail()
    {
        List<User> user = userRepo.findByRolesTitle("employee");


        return user.stream().map(a ->
                                                modelMapper.map(a, UserResponseForEmailDTO.class)
                                        ).collect(Collectors.toList());
    }
    public UserResponceWithManagerAndTeamDTO getUserById(Long id)
    {
        User user = userRepo.findById(id).orElseThrow(()->new RuntimeException("user Not found"));
        return modelMapper.map(user,UserResponceWithManagerAndTeamDTO.class);
    }

    public List<UserResponceBaseDTO> getTeamMemberByManager()
    {
        User user = userRepo.findById((Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).orElseThrow(()->new RuntimeException("manager Not found"));
        return user.getTeamMember().stream().map(
                x->modelMapper.map(x,UserResponceBaseDTO.class)
        ).toList();
    }

    public List<NotificationResponseDTO> getAllNotification(Long userId)
    {   User user=userRepo.findById(userId).orElseThrow(()->new RuntimeException("user not found"));
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
    {   User user=userRepo.findById(userId).orElseThrow(()->new RuntimeException("user not found"));

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
}
