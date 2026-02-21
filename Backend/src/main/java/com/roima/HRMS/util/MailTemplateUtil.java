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
}