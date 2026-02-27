package com.roima.HRMS.util;

public class MailTemplateUtil {

    public static String jobReferralEmailTemplate(String jobTitle, String jobId, String referrerName,
                                                  String referrerId, String friendName, String friendEmail,
                                                  String shortNote, String cvLink) {
        return "Dear HR Team,\n\n" +
                "A new referral has been submitted:\n\n" +
                "Job Title: " + jobTitle + "\n" +
                "Job ID: " + jobId + "\n\n" +
                "Referred By: " + referrerName + " (ID: " + referrerId + ")\n" +
                "Friend Name: " + friendName + "\n" +
                "Friend Email: " + friendEmail + "\n" +
                "Short Note: " + shortNote + "\n" +
                "Candidate CV: " + cvLink + "\n\n" +
                "Please review the referral in the system.\n\n" +
                "Best Regards,\n" +
                "HRMS System";
    }

    public static String jobShareEmailTemplate(String jobTitle, String jobDescription, String jdLink) {
        return "Dear User,\n\n" +
                "A job opportunity has been shared with you:\n\n" +
                "Job Title: " + jobTitle + "\n" +
                "Description: " + jobDescription + "\n\n" +
                "Job Description Document: " + jdLink + "\n\n" +
                "Check the system for more details.\n\n" +
                "Best Regards,\n" +
                "HRMS System";
    }

    public static String reviewerAddedEmailTemplate(String jobTitle, String jobId) {
        return "Dear Reviewer,\n\n" +
                "You have been added as a CV Reviewer for the following job:\n\n" +
                "Job Title: " + jobTitle + "\n" +
                "Job ID: " + jobId + "\n\n" +
                "Please check the system for referrals to review.\n\n" +
                "Best Regards,\n" +
                "HRMS System";
    }

    public static String hrAddedEmailTemplate(String jobTitle, String jobId) {
        return "Dear HR Team,\n\n" +
                "You have been assigned to manage the following job:\n\n" +
                "Job Title: " + jobTitle + "\n" +
                "Job ID: " + jobId + "\n\n" +
                "Please check the system for referrals and other details.\n\n" +
                "Best Regards,\n" +
                "HRMS System";
    }


    public static String travelerAddedEmailTemplate(String travelTitle, String travelStart,String travelEnd) {
        return "Dear Traveler,\n\n" +
                "You have been added as a tarveler for the following tavel:\n\n" +
                "Travel Title: " + travelTitle + "\n" +
                "Travel from : " + travelStart + "\n\n" +
                "Travel to : " + travelEnd + "\n" +
                "Please check the system for more travel details.\n\n" +
                "Best Regards,\n" +
                "HRMS System";
    }

    public static String contentWarningEmailTemplate(String content, String postTitle) {
        return "Dear User,\n\n" +
                "Your content have been founded as wrong by HR team:\n\n" +
                "Post Title: " + postTitle + "\n" +
                "Content Type : " + content + "\n\n" +
                "Please be aware of content policy.\n\n" +
                "Best Regards,\n" +
                "HRMS System";
    }

    public static String expenseAddedEmailTemplate(String travelTitle, String travelerName,String expenseDate) {
        return "Dear HR Team,\n\n" +
                " A travel expense has been added with system:\n\n" +
                "Travel details : " + travelTitle+ "\n" +
                "Traveler name: " + travelerName + "\n\n" +
                "Travel Expense Date : " + expenseDate + "\n\n" +
                "Please check the system for more expense details.\n\n" +
                "Best Regards,\n" +
                "HRMS System";
    }
    public static String gameBookingEmailTemplate(String gameName, String createdBy,String bookingStatus) {
        return "Dear Player,\n\n" +
                "You have been added as a player for the following Game booking:\n\n" +
                "Game name: " + gameName + "\n" +
                "Craeted by : " + createdBy + "\n\n" +
                "Game Booking status: " + bookingStatus  + "\n" +
                "Please check the system for more Game Booking details.\n\n" +
                "Best Regards,\n" +
                "HRMS System";
    }

}