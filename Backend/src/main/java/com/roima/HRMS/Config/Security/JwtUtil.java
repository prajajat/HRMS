package com.roima.HRMS.Config.Security;


import com.roima.HRMS.entites.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import com.roima.HRMS.entites.Role;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtUtil {


    @Value("${jwt.SECRET}")
    private String SECRET ;

    public String generateToken(User user) {

        log.info("user >>>> {}",user);

        List<String> roles = user.getRoles()
                .stream()
                .map(Role::getTitle)
                .toList();
        log.info("roles>>>> {}",roles);

        return Jwts.builder()
                .setSubject(user.getUserId().toString())
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + 1500 * 60 * 1000)
                )
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()))
                .compact();

    }

    public boolean validateToken(String token) {
        Jwts.parserBuilder()
                .setSigningKey( SECRET.getBytes() )
                .build()
                .parseClaimsJws(token);
        return true;
    }

    public Long getUserId(String token) {
        return Long.valueOf(
                Jwts.parserBuilder()
                                .setSigningKey( SECRET.getBytes() )
                                .build()
                                .parseClaimsJws(token)
                                .getBody()
                                .getSubject()
        );
    }


    public List<GrantedAuthority> getAuthorities(String token) {

        Claims claims = Jwts.parserBuilder()
                .setSigningKey( SECRET.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();

        List<String> roles = claims.get("roles", List.class);

        return roles.stream()
                .map(
                        role-> (GrantedAuthority)new SimpleGrantedAuthority(role))
                .collect(Collectors.toList()
                );
    }
}