package com.roima.HRMS.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.roima.HRMS.dtos.request.*;
import com.roima.HRMS.dtos.response.*;
import com.roima.HRMS.services.AchievementService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/achievement")
@Slf4j
@RequiredArgsConstructor
public class AchievementController {

    private final AchievementService achievementService;

    // ==================== POST ENDPOINTS ====================

    @PreAuthorize("hasAuthority('All-User')")
    @PostMapping(value = "/post/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BasicResponse> createPost(
            @RequestParam("postData") String dto,
            @RequestParam(value = "mainDocument", required = false) MultipartFile mainDocument) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        PostCreateDTO newDTO = mapper.readValue(dto, PostCreateDTO.class);
        log.info("Creating post: {}", newDTO.getTitle());
        return ResponseEntity.ok(achievementService.createPost(newDTO, mainDocument));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/post/all")
    public ResponseEntity<List<PostResponseDTO>> getFeed(@ModelAttribute PostFilterDTO filter) {
        log.info("Fetching feed with filters");
        return ResponseEntity.ok(achievementService.getFeed(filter));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/post/{postId}")
    public ResponseEntity<PostResponseDTO> getPost(@PathVariable Long postId) {
        log.info("Fetching post: {}", postId);
        return ResponseEntity.ok(achievementService.getPostById(postId));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @PutMapping(value = "/post/{postId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BasicResponse> updatePost(
            @PathVariable Long postId,
            @RequestParam("postData") String dto,
            @RequestParam(value = "mainDocument", required = false) MultipartFile mainDocument) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        PostUpdateDTO newDTO = mapper.readValue(dto, PostUpdateDTO.class);
        log.info("Updating post: {}", postId);
        return ResponseEntity.ok(achievementService.updatePost(postId, newDTO));
    }

    @PreAuthorize("hasAuthority('manage-post')")
    @DeleteMapping("/post/{postId}")
    public ResponseEntity<BasicResponse> deletePost(@PathVariable Long postId) {
        log.info("Deleting post: {}", postId);
        return ResponseEntity.ok(achievementService.deletePost(postId));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @PostMapping("/post/{postId}/like")
    public ResponseEntity<BasicResponse> toggleLikePost(@PathVariable Long postId) {
        log.info("Toggling like on post: {}", postId);
        return ResponseEntity.ok(achievementService.toggleLikePost(postId));
    }

    // ==================== COMMENT ENDPOINTS ====================

    @PreAuthorize("hasAuthority('All-User')")
    @PostMapping("/comment/post/{postId}")
    public ResponseEntity<BasicResponse> addCommentToPost(
            @PathVariable Long postId,
            @RequestBody CommentCreateDTO dto) {
        log.info("Adding comment to post: {}", postId);
        return ResponseEntity.ok(achievementService.addCommentToPost(postId, dto));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @PostMapping("/comment/{commentId}/reply")
    public ResponseEntity<BasicResponse> replyToComment(
            @PathVariable Long commentId,
            @RequestBody CommentCreateDTO dto) {
        log.info("Replying to comment: {}", commentId);
        return ResponseEntity.ok(achievementService.replyToComment(commentId, dto));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @PutMapping("/comment/{commentId}")
    public ResponseEntity<BasicResponse> updateComment(
            @PathVariable Long commentId,
            @RequestBody CommentUpdateDTO dto) {
        log.info("Updating comment: {}", commentId);
        return ResponseEntity.ok(achievementService.updateComment(commentId, dto));
    }

    @PreAuthorize("hasAuthority('manage-post')")
    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<BasicResponse> deleteComment(@PathVariable Long commentId) {
        log.info("Deleting comment: {}", commentId);
        return ResponseEntity.ok(achievementService.deleteComment(commentId));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @PostMapping("/comment/{commentId}/like")
    public ResponseEntity<BasicResponse> toggleLikeComment(@PathVariable Long commentId) {
        log.info("Toggling like on comment: {}", commentId);
        return ResponseEntity.ok(achievementService.toggleLikeComment(commentId));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/comment/post/{postId}")
    public ResponseEntity<List<CommentResponseDTO>> getCommentsForPost(@PathVariable Long postId) {
        log.info("Fetching comments for post: {}", postId);
        return ResponseEntity.ok(achievementService.getCommentsForPost(postId));
    }

    // ==================== TAG ENDPOINTS ====================

    @PreAuthorize("hasAuthority('All-User')")
    @PostMapping("/tag/create")
    public ResponseEntity<BasicResponse> createTag(@RequestBody TagCreateDTO dto) {
        log.info("Creating tag: {}", dto.getTagName());
        return ResponseEntity.ok(achievementService.createTag(dto));
    }

    @PreAuthorize("hasAuthority('All-User')")
    @GetMapping("/tag/all")
    public ResponseEntity<List<TagResponseDTO>> getAllTags() {
        log.info("Fetching all tags");
        return ResponseEntity.ok(achievementService.getAllTags());
    }
}
