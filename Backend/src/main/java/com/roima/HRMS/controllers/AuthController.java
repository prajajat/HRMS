package com.roima.HRMS.controllers;

import com.roima.HRMS.dtos.request.LoginDTO;
import com.roima.HRMS.dtos.response.LoginResponseDTO;
import com.roima.HRMS.dtos.response.RefreshTokenResponseDTO;
import com.roima.HRMS.services.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginDTO request, HttpServletResponse response ) {
        LoginResponseDTO loginResponseDTO= authService.login(request);
        ResponseCookie cookie = ResponseCookie.from("REFRESH_TOKEN",loginResponseDTO.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("Lax")
                .maxAge(Duration.ofDays(30))
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return  loginResponseDTO;
    }
    @GetMapping("/refreshToken/")
    public RefreshTokenResponseDTO checkRefreshToken(@CookieValue(value = "REFRESH_TOKEN", defaultValue = "UNKNOWN") String token) {
     log.info("t>>{}",token);
        return authService.checkRefreshToken(token);
    }
}
