package com.roima.HRMS.services;


import com.roima.HRMS.dtos.responce.UserResponceForEmailDTO;
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

    public List<UserResponceForEmailDTO> getAllUserWithNameAndEmail()
    {
        List<User> user = userRepo.findByRolesTitle("emp");

        List<UserResponceForEmailDTO> responce = user.stream()
                                        .map(a ->
                                                modelMapper.map(a, UserResponceForEmailDTO.class)
                                        ).collect(Collectors.toList());
        return responce;
    }
}
