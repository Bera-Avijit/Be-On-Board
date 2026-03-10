package com.beonboard.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

/**
 * EmailService: The Courier service.
 * It takes the OTP and sends a professional email to the user.
 */
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    /**
     * Sends the 6-digit verification code.
     */
    public void sendVerificationEmail(String toAddress, String name, String otp) 
            throws MessagingException, UnsupportedEncodingException {
        
        String fromAddress = "avijit.bera1754@gmail.com";
        String senderName = "BeOnBoard - Team";
        String subject = "Verify your account - BeOnBoard";
        String content = "Dear [[name]],<br>"
                + "Please use the OTP below to verify your account:<br>"
                + "<h3>[[OTP]]</h3>"
                + "Thank you,<br>"
                + "BeOnBoard Team.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", name);
        content = content.replace("[[OTP]]", otp);

        helper.setText(content, true);

        mailSender.send(message);
    }
}
