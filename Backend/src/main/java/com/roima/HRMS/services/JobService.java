package com.roima.HRMS.services;

import com.roima.HRMS.dtos.request.*;
import com.roima.HRMS.dtos.response.*;
import com.roima.HRMS.entites.*;
import com.roima.HRMS.repos.*;
import com.roima.HRMS.util.MailTemplateUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final JobReferRepository jobReferRepository;
    private final JobShareRepository jobShareRepository;
    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;
    private final SystemConfigRepository systemConfigRepository;
    private final NotificationRepository notificationRepository;
    private final CloudinaryService cloudinaryService;
    private final EmailService emailService;
    private final ModelMapper modelMapper;


    public BasicResponse createJob(JobCreateDTO dto, MultipartFile document) {
        Job job = new Job();

        job.setTitle(dto.getTitle());
         job.setDescription(dto.getDescription());
         job.setStatus(true);


        job.setCreatedBy(findUserById((Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal()));

        if (document != null && !document.isEmpty()) {
            String url = cloudinaryService.uploadFile(document);
             Document doc = new Document();

             doc.setFileName(dto.getTitle() + " - JD");
                doc.setUrl(url);
                doc.setOwnerType("hr");
                doc.setDocumentType("pdf");

            doc.setUploadedBy(job.getCreatedBy());

            documentRepository.save(doc);
              job.setJobDescription(doc);
            log.info("doc created {}",doc.getDocumentId());
        }

         job.setReviewers(new ArrayList<>());
        job.setHrs(new ArrayList<>());
        jobRepository.save(job);

        List<User> allUsers = userRepository.findAll();
        for (User user : allUsers) {

            Notification notification = new Notification();
            notification.setTitle("New Job Created");
            notification.setDescription("New job posting: " + job.getTitle());

            notification.setUser(user);
            notificationRepository.save(notification);
        }

        return new BasicResponse("Job created successfully");
    }

    public List<JobResponseDTO> getAllJobs(JobFilterDTO filter) {
        List<Job> jobs = jobRepository.findAll();

        return jobs.stream()
                .filter(job -> {
                    if (filter.getStatus() != null && !job.getStatus().equals(filter.getStatus())) {
                        return false;
                    }
                    if (filter.getStartDate() != null && job.getCreatedAt().isBefore(filter.getStartDate())) {
                        return false;
                    }
                    if (filter.getEndDate() != null && job.getCreatedAt().isAfter(filter.getEndDate())) {
                        return false;
                    }
                    if (filter.getCreatedById() != null && !job.getCreatedBy().getUserId().equals(filter.getCreatedById())) {
                        return false;
                    }
                    if (filter.getSearch() != null && !filter.getSearch().isEmpty()) {
                        String search = filter.getSearch().toLowerCase();
                        if (!job.getTitle().toLowerCase().contains(search) &&
                                !job.getDescription().toLowerCase().contains(search)) {
                            return false;
                        }
                    }
                    return true;
                })
                .map(x->modelMapper.map(x,JobResponseDTO.class))
                .collect(Collectors.toList());
    }

    public BasicResponse patchJobStatus(Long jobId, JobStatusPatchDTO dto) {
        Job job = findJobById(jobId);
        job.setStatus(dto.getStatus());
        jobRepository.save(job);
        return new BasicResponse("Job status updated successfully");
    }


    public BasicResponse addReviewer(Long jobId, AddReviewerDTO dto) {

        Job job = findJobById(jobId);
        User reviewer = findUserById(dto.getUserId());

         if (job.getReviewers() == null) {
            job.setReviewers(new ArrayList<>());
        }

         if (!job.getReviewers().contains(reviewer)) {
            job.getReviewers().add(reviewer);
        }

        jobRepository.save(job);


        String emailBody = MailTemplateUtil.reviewerAddedEmailTemplate(job.getTitle(), job.getJobId().toString());
        emailService.sendMail(List.of(reviewer.getPersonalEmail()), "Added as CV Reviewer for " + job.getTitle(), emailBody);


            Notification notification = new Notification();
            notification.setTitle("New Job to Review");
            notification.setDescription("You have been added as CV reviewer for: " + job.getTitle());

            notification.setUser(reviewer);
        notificationRepository.save(notification);

        return new BasicResponse("Reviewer added successfully");
    }


    public BasicResponse addHr(Long jobId, AddHrDTO dto) {
        Job job = findJobById(jobId);
        User hr = findUserById(dto.getUserId());

         if (job.getHrs() == null) {
            job.setHrs(new ArrayList<>());
        }

         if (!job.getHrs().contains(hr)) {
            job.getHrs().add(hr);
        }

        jobRepository.save(job);

        String emailBody = MailTemplateUtil.hrAddedEmailTemplate(job.getTitle(), job.getJobId().toString());
        emailService.sendMail(List.of(hr.getPersonalEmail()), "Assigned to manage job: " + job.getTitle(), emailBody);

            Notification notification = new Notification();
            notification.setTitle("New Job Assignment");
            notification.setDescription("You have been assigned to manage: " + job.getTitle());

            notification.setUser(hr);
        notificationRepository.save(notification);

        return new BasicResponse("HR added successfully");
    }

    public List<SystemConfigResponseDTO> getSystemConfig() {
        return systemConfigRepository.findAll().stream().map(
                config -> modelMapper.map(config, SystemConfigResponseDTO.class))
                .collect(Collectors.toList());
    }


    public BasicResponse patchSystemConfig(SystemConfigPatchDTO dto) {
        SystemConfig config = systemConfigRepository.findByConfigKey(dto.getConfigKey())
                .orElseThrow(() -> new RuntimeException("Config key not found"));

        config.setConfigValue(dto.getConfigValue());
         systemConfigRepository.save(config);
        return new BasicResponse("System config updated successfully");
    }


    public List<JobResponseDTO> getActiveJobs(String search) {
        return jobRepository.findByStatus(true)
                .stream()
                .filter(job -> {
                    if (search == null || search.isEmpty()) {
                        return true;
                    }
                    String lowerSearch = search.toLowerCase();
                    return job.getTitle().toLowerCase().contains(lowerSearch) ||
                            job.getDescription().toLowerCase().contains(lowerSearch);
                })
                .map(x->modelMapper.map(x,JobResponseDTO.class))
                .collect(Collectors.toList());
    }

    public List<JobReferResponseDTO> getUserReferrals() {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = findUserById(userId);

        return jobReferRepository.findByReferer(user)
                .stream()
                .map(x->modelMapper.map(x,JobReferResponseDTO.class))
                .collect(Collectors.toList());
    }


    public List<JobShareResponseDTO> getUserShares() {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = findUserById(userId);

        return jobShareRepository.findBySender(user)
                .stream()
                .map(x->modelMapper.map(x,JobShareResponseDTO.class))
                .collect(Collectors.toList());
    }

    public BasicResponse createReferral(Long jobId, JobReferCreateDTO dto, MultipartFile cv) {
        Job job = findJobById(jobId);
        User referer = findUserById((Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        JobRefer jobRefer = new JobRefer();
          jobRefer.setFriendName(dto.getFriendName());
        jobRefer.setFriendMail(dto.getFriendMail());

        jobRefer.setShortNote(dto.getShortNote());
        jobRefer.setStatus("PENDING");

        jobRefer.setJob(job);
        jobRefer.setReferer(referer);

        if (cv != null && !cv.isEmpty()) {
            String url = cloudinaryService.uploadFile(cv);
            Document cvDoc = new Document();
            cvDoc.setFileName(dto.getFriendName() + " - CV");
            cvDoc.setUrl(url);

            cvDoc.setOwnerType("employee");
            cvDoc.setDocumentType("pdf");
            cvDoc.setUploadedBy(referer);

            documentRepository.save(cvDoc);
            jobRefer.setCv(cvDoc);
        }

        jobReferRepository.save(jobRefer);


        List<String> hrEmails = new ArrayList<>();

        if (job.getHrs() != null) {
            hrEmails.addAll(job.getHrs().stream()
                    .map(User::getPersonalEmail)
                    .collect(Collectors.toList()));
        }

        SystemConfig defaultHr = systemConfigRepository.findByConfigKey("default_hr").orElse(null);

        if (defaultHr != null && !defaultHr.getConfigValue().isEmpty()) {
            hrEmails.add(defaultHr.getConfigValue());
        }

        SystemConfig specialHr = systemConfigRepository.findByConfigKey("special_hr").orElse(null);

        if (specialHr != null && !specialHr.getConfigValue().isEmpty()) {
            hrEmails.add(specialHr.getConfigValue());
        }

        String cvLink = jobRefer.getCv() != null ? jobRefer.getCv().getUrl() : "Not provided";

        String emailBody = MailTemplateUtil.jobReferralEmailTemplate(
                job.getTitle(), job.getJobId().toString(), referer.getUserName(),
                referer.getUserId().toString(), dto.getFriendName(), dto.getFriendMail(),
                dto.getShortNote(), cvLink);

        if (!hrEmails.isEmpty()) {
            emailService.sendMail(hrEmails, "New Referral for " + job.getTitle(), emailBody);
        }


        if (job.getHrs() != null) {
            for (User hr : job.getHrs()) {
                Notification notification = new Notification();

                notification.setTitle("New Referral");
                notification.setDescription(referer.getUserName() + " referred " + dto.getFriendName() + " for " + job.getTitle());
                notification.setUser(hr);
                notificationRepository.save(notification);
            }
        }

        return new BasicResponse("Referral created successfully");
    }


    public BasicResponse shareJob(Long jobId, JobShareCreateDTO dto) {
        Job job = findJobById(jobId);
        User sender = findUserById((Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        JobShare jobShare = new JobShare();

        jobShare.setReceiverMail(dto.getReceiverMail());

        jobShare.setJob(job);
        jobShare.setSender(sender);

        jobShareRepository.save(jobShare);


         String jdLink = job.getJobDescription() != null ? job.getJobDescription().getUrl() : "Not provided";


        String emailBody = MailTemplateUtil.jobShareEmailTemplate(job.getTitle(), job.getDescription(), jdLink);

        emailService.sendMail(List.of(dto.getReceiverMail()), job.getTitle() + " shared with you", emailBody);

        return new BasicResponse("Job shared successfully");
    }


    private Job findJobById(Long jobId) {
        return jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}