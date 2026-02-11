package com.roima.HRMS.services;


import com.roima.HRMS.dtos.responce.UserResponseForEmailDTO;
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
        List<User> user = userRepo.findByRolesTitle("emp");

        List<UserResponseForEmailDTO> responce = user.stream()
                                        .map(a ->
                                                modelMapper.map(a, UserResponseForEmailDTO.class)
                                        ).collect(Collectors.toList());
        return responce;
    }
}
