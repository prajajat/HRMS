package com.roima.HRMS.services;

import com.roima.HRMS.Config.Security.JwtUtil;
import com.roima.HRMS.dtos.request.LoginDTO;
import com.roima.HRMS.dtos.request.RefreshTokenDTO;
import com.roima.HRMS.dtos.responce.LoginResponceDTO;
import com.roima.HRMS.dtos.responce.RefreshTokenResponceDTO;
import com.roima.HRMS.entites.User;
import com.roima.HRMS.repos.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;


    public LoginResponceDTO login(LoginDTO request) {

        User user = userRepo.findByCompanyEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        log.info("user >>> {}",user);

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword() )) {
            throw new RuntimeException("Invalid credentials");
        }

        //log.info("my password {}",passwordEncoder.encode("123@123") );

        String accessToken = jwtUtil.generateToken(user);

        user.setRefreshToken(UUID.randomUUID().toString());
        user.setExpiryDate(
                LocalDateTime.now().plus(30, ChronoUnit.DAYS)
        );

        LoginResponceDTO responce=new LoginResponceDTO();
        responce.setAccessToken(accessToken);
        responce.setRefreshToken(user.getRefreshToken());
        return responce;
    }

    public RefreshTokenResponceDTO checkRefreshToken(RefreshTokenDTO request)
    {
        User user = userRepo.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));

        if(user.getRefreshToken().equals(request.getRefreshToken())&& user.getExpiryDate().isBefore(LocalDateTime.now()))
        {
             RefreshTokenResponceDTO responce=new RefreshTokenResponceDTO();
             responce.setAccessToken(jwtUtil.generateToken(user));
            return responce;
        }
        else
        {
            throw new RuntimeException("invalid refresh token");
        }

    }
}