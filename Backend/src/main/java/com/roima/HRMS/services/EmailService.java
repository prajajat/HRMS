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

        message.setTo(to.toArray(new String[0]));

        message.setSubject(subject);
        message.setText(body);
        log.info("Mail send to : {} {} with subject: {} Body: {} ",to.size(),to, subject,body);
       // mailSender.send(message);
    }

}
