package com.roima.HRMS.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.internal.bytebuddy.pool.TypePool;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public void sendMail(List<String> to,String subject,String body)
    {
        SimpleMailMessage message=new SimpleMailMessage();
        message.setFrom("prajapatijatin233@gmail.com");
        to.forEach(
               x-> message.setTo(x)
        );
        message.setSubject(subject);
        message.setText(body);
    }

}
