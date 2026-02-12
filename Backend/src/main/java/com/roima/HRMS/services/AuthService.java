package com.roima.HRMS.services;


import com.roima.HRMS.Config.Security.JwtUtil;
import com.roima.HRMS.dtos.request.LoginDTO;
import com.roima.HRMS.dtos.responce.LoginResponseDTO;
import com.roima.HRMS.dtos.responce.RefreshTokenResponseDTO;
import com.roima.HRMS.dtos.responce.RoleDTO;
import com.roima.HRMS.entites.User;
import com.roima.HRMS.repos.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;



    public LoginResponseDTO login(LoginDTO request) {

        User user = userRepo.findByCompanyEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        log.info("user >>> {}", user);

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        //log.info("my password {}",passwordEncoder.encode("123@123") );

        String accessToken = jwtUtil.generateToken(user);

        user.setRefreshToken(UUID.randomUUID().toString());
        user.setExpiryDate(
                LocalDateTime.now().plus(30, ChronoUnit.DAYS)
        );
        userRepo.save(user);

        LoginResponseDTO response = new LoginResponseDTO();
        response.setAccessToken(accessToken);
        response.setRefreshToken(user.getRefreshToken());
        response.setUserId(user.getUserId());
        response.setRoles(
                user.getRoles().stream().map(
                        a->modelMapper.map(a, RoleDTO.class)
                ).toList());
        return response;
    }

    public RefreshTokenResponseDTO checkRefreshToken(String request) {

        User user = userRepo.findByRefreshTokenAndExpiryDateGreaterThan(request, LocalDateTime.now()).orElseThrow(() -> new RuntimeException("Refresh token expired or invalid."));

        RefreshTokenResponseDTO response = new RefreshTokenResponseDTO();
        response.setAccessToken(jwtUtil.generateToken(user));
        return response;


    }
}