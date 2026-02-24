package com.roima.HRMS.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.internal.bytebuddy.pool.TypePool;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
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
        log.info("mail sender{}{}{}",body,subject,to.get(0));
       // mailSender.send(message);
    }

}
