package com.roima.HRMS.controllers;

import com.roima.HRMS.dtos.request.LoginDTO;
import com.roima.HRMS.dtos.responce.LoginResponceDTO;
import com.roima.HRMS.dtos.responce.RefreshTokenResponceDTO;
import com.roima.HRMS.exception.JwtInvalidException;
import com.roima.HRMS.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponceDTO login(@RequestBody LoginDTO request) {

        return authService.login(request);
    }
    @PostMapping("/refreshToken/{token}")
    public RefreshTokenResponceDTO checkRefreshToken(@PathVariable String token) {

        return authService.checkRefreshToken(token);
    }
}
