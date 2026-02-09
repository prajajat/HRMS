package com.roima.HRMS.controllers;

import com.roima.HRMS.dtos.request.LoginDTO;
import com.roima.HRMS.dtos.request.RefreshTokenDTO;
import com.roima.HRMS.dtos.responce.LoginResponceDTO;
import com.roima.HRMS.dtos.responce.RefreshTokenResponceDTO;
import com.roima.HRMS.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponceDTO login(@RequestBody LoginDTO request) {
        return authService.login(request);
    }
    @PostMapping("/refreshToken/{id}")
    public RefreshTokenResponceDTO checkRefreshToken(@RequestBody RefreshTokenDTO request) {
        return authService.checkRefreshToken(request);
    }
}
