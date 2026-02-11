package com.roima.HRMS.controllers;

import com.roima.HRMS.dtos.request.LoginDTO;
import com.roima.HRMS.dtos.responce.LoginResponseDTO;
import com.roima.HRMS.dtos.responce.RefreshTokenResponseDTO;
import com.roima.HRMS.services.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    @CrossOrigin("http://localhost:5173")
    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginDTO request, HttpServletResponse responce ) {
        LoginResponseDTO loginResponseDTO= authService.login(request);
        ResponseCookie cookie = ResponseCookie.from("REFRESH_TOKEN",loginResponseDTO.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("Lax")
                .maxAge(Duration.ofMinutes(90))
                .build();

        responce.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return  loginResponseDTO;
    }
    @PostMapping("/refreshToken/{token}")
    public RefreshTokenResponseDTO checkRefreshToken(@PathVariable String token) {

        return authService.checkRefreshToken(token);
    }
}
