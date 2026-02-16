package com.roima.HRMS.services;



import com.roima.HRMS.dtos.response.UserResponceWithManagerAndTeamDTO;
import com.roima.HRMS.dtos.response.UserResponseForEmailDTO;
import com.roima.HRMS.dtos.response.UserResponseWithTeamAndManagerDTO;
import com.roima.HRMS.entites.User;
import com.roima.HRMS.repos.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepo;
    private final ModelMapper modelMapper;

    public List<UserResponseForEmailDTO> getAllUserWithNameAndEmail()
    {
        List<User> user = userRepo.findByRolesTitle("employee");


        List<UserResponseForEmailDTO> responce = user.stream()
                                        .map(a ->
                                                modelMapper.map(a, UserResponseForEmailDTO.class)
                                        ).collect(Collectors.toList());
        return responce;
    }
    public UserResponceWithManagerAndTeamDTO getUserById(Long id)
    {
        User user = userRepo.findById(id).orElseThrow(()->new RuntimeException("user Not found"));
        return modelMapper.map(user,UserResponceWithManagerAndTeamDTO.class);
    }

    public List<UserResponseForEmailDTO> getAllUser()
    {
       List<User> user = userRepo.findAll();

        return user.stream()
                .map(a ->
                        modelMapper.map(a, UserResponseForEmailDTO.class)
                ).toList();
    }
}
