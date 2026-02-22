package com.roima.HRMS.Schedulers;

import com.roima.HRMS.entites.Document;
import com.roima.HRMS.entites.Post;
import com.roima.HRMS.entites.SystemConfig;
import com.roima.HRMS.entites.User;
import com.roima.HRMS.repos.DocumentRepository;
import com.roima.HRMS.repos.PostRepository;
import com.roima.HRMS.repos.SystemConfigRepository;
import com.roima.HRMS.repos.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AchievementScheduler {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final SystemConfigRepository systemConfigRepository;
    private final DocumentRepository documentRepository;

    /**
     * Scheduled task to create posts for birthdays and work anniversaries
     * Runs every 24 hours
     */
    @Scheduled(cron = "0 0 0 * * *") // Runs daily at midnight
    public void createAchievementPosts() {
        log.info("Starting achievement post scheduler");

        try {
            LocalDate today = LocalDate.now();

            // Get all users
            List<User> users = userRepository.findAll();

            for (User user : users) {
                // Check for birthday
                if (isBirthday(user, today)) {
                    createBirthdayPost(user);
                }

                // Check for work anniversary
                if (isWorkAnniversary(user, today)) {
                    createAnniversaryPost(user);
                }
            }

            log.info("Achievement post scheduler completed");
        } catch (Exception e) {
            log.error("Error in achievement post scheduler", e);
        }
    }

    /**
     * Check if today is user's birthday
     */
    private boolean isBirthday(User user, LocalDate today) {
        if (user.getDateOfBirth() == null) {
            return false;
        }
        LocalDate birthDate = user.getDateOfBirth().toLocalDate();
        return birthDate.getMonthValue() == today.getMonthValue() &&
               birthDate.getDayOfMonth() == today.getDayOfMonth();
    }

    /**
     * Check if today is user's work anniversary
     */
    private boolean isWorkAnniversary(User user, LocalDate today) {
        if (user.getDateOfJoin() == null) {
            return false;
        }
        LocalDate joiningDate = user.getDateOfJoin().toLocalDate();
        return joiningDate.getMonthValue() == today.getMonthValue() &&
               joiningDate.getDayOfMonth() == today.getDayOfMonth() &&
               joiningDate.getYear() != today.getYear(); // Not the joining year
    }

    /**
     * Create birthday post
     */
    private void createBirthdayPost(User user) {
        try {
            SystemConfig config = systemConfigRepository.findByConfigKey("birthday_post_template").orElseThrow(()->new RuntimeException("birthday_post_document_id not found"));
            
            Post post = new Post();
            post.setAuthor(null); // System post
            post.setCreatedFor(user);
            post.setTitle("Happy Birthday!");
            
            String description = config != null ? config.getConfigValue() : 
                    "Wishing " + user.getUserName() + " a very happy birthday! 🎉";
            post.setDescription(description);
            
            post.setVisibility("all");
            post.setCreatedAt(LocalDateTime.now());
            post.setIsActive(true);
            
            // Set main document from SystemConfig
            SystemConfig docConfig = systemConfigRepository.findByConfigKey("birthday_post_document_id").orElseThrow(()->new RuntimeException("birthday_post_document_id not found"));
            if (docConfig != null) {
                try {
                    Long docId = Long.parseLong(docConfig.getConfigValue());
                    Document doc = documentRepository.findById(docId).orElse(null);
                    if (doc != null) {
                        post.setMainDocument(doc);
                    }
                } catch (NumberFormatException e) {
                    log.warn("Invalid document ID in SystemConfig for birthday posts");
                }
            }

            postRepository.save(post);
            log.info("Birthday post created for user: {}", user.getUserId());
        } catch (Exception e) {
            log.error("Error creating birthday post for user: {}", user.getUserId(), e);
        }
    }

    /**
     * Create work anniversary post
     */
    private void createAnniversaryPost(User user) {
        try {
            SystemConfig config = systemConfigRepository.findByConfigKey("anniversary_post_template").orElseThrow(()->new RuntimeException("anniversary_post_template not found"));
            
            Post post = new Post();
            post.setAuthor(null); // System post
            post.setCreatedFor(user);
            post.setTitle("Work Anniversary!");
            
            LocalDate joiningDate = user.getDateOfJoin().toLocalDate();
            LocalDate today = LocalDate.now();
            int yearsWorked = today.getYear() - joiningDate.getYear();
            
            String description = config != null ? config.getConfigValue() : 
                    "Celebrating " + yearsWorked + " year(s) with " + user.getUserName() + "! 🎊";
            post.setDescription(description);
            
            post.setVisibility("all");
            post.setCreatedAt(LocalDateTime.now());
            post.setIsActive(true);
            
            // Set main document from SystemConfig
            SystemConfig docConfig = systemConfigRepository.findByConfigKey("anniversary_post_document_id").orElseThrow(()->new RuntimeException("anniversary_post_document_id not found"));
            if (docConfig != null) {
                try {
                    Long docId = Long.parseLong(docConfig.getConfigValue());
                    Document doc = documentRepository.findById(docId).orElse(null);
                    if (doc != null) {
                        post.setMainDocument(doc);
                    }
                } catch (NumberFormatException e) {
                    log.warn("Invalid document ID in SystemConfig for anniversary posts");
                }
            }

            postRepository.save(post);
            log.info("Anniversary post created for user: {}", user.getUserId());
        } catch (Exception e) {
            log.error("Error creating anniversary post for user: {}", user.getUserId(), e);
        }
    }
}
