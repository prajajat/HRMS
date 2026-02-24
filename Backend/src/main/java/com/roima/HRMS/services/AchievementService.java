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

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class AchievementService {

    private final PostRepository postRepository;
    private final TagRepository tagRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;
    private final NotificationRepository notificationRepository;
    private final CloudinaryService cloudinaryService;
    private final EmailService emailService;
    private final ModelMapper modelMapper;

    // ==================== POST OPERATIONS ====================

    /**
     * Create a new post with tags and optional main document
     */
    public BasicResponse createPost(PostCreateDTO dto, MultipartFile mainDocument) {
        Post post = new Post();
        post.setTitle(dto.getTitle());
        post.setDescription(dto.getDesc());
        post.setVisibility(dto.getVisibility());
        post.setCreatedAt(LocalDateTime.now());
        post.setIsActive(true);

        // Set author from security context
        Long currentUserId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User author = findUserById(currentUserId);
        post.setAuthor(author);

        // Handle main document upload
        if (mainDocument != null && !mainDocument.isEmpty()) {
            String url = cloudinaryService.uploadFile(mainDocument);
            Document doc = new Document();
            doc.setFileName(dto.getTitle() + " - Post Document");
            doc.setUrl(url);
            doc.setOwnerType("post");
            doc.setDocumentType("image");
            doc.setUploadedBy(author);
            documentRepository.save(doc);
            post.setMainDocument(doc);
            log.info("Main document created for post: {}", doc.getDocumentId());
        }

        // Assign tags
        if (dto.getTagIds() != null && !dto.getTagIds().isEmpty()) {
            Set<Tag> tags = new HashSet<>(tagRepository.findAllById(dto.getTagIds()));
            post.setTags(tags);
        } else {
            post.setTags(new HashSet<>());
        }

        postRepository.save(post);
        log.info("Post created successfully with ID: {}", post.getPkPostId());

        return new BasicResponse("Post created successfully");
    }

    /**
     * Get feed with filters
     */
    public List<PostResponseDTO> getFeed(PostFilterDTO filter) {
        List<Post> posts = postRepository.findAll();
        Long currentUserId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        posts.sort(Comparator.comparing(Post::getCreatedAt).reversed());
        return posts.stream()
                .filter(post -> post.getIsActive())
                .filter(post -> {
                    if (filter.getTagId() != null) {
                        return post.getTags().stream().anyMatch(tag -> tag.getPkTagId().equals(filter.getTagId()));
                    }
                    return true;
                })
                .filter(post -> {
                    if (filter.getAuthorId() != null) {
                        return post.getAuthor() != null && post.getAuthor().getUserId().equals(filter.getAuthorId());
                    }
                    return true;
                })
                .filter(post -> {
                    if (filter.getStartDate() != null && post.getCreatedAt().isBefore(filter.getStartDate())) {
                        return false;
                    }
                    if (filter.getEndDate() != null && post.getCreatedAt().isAfter(filter.getEndDate())) {
                        return false;
                    }
                    return true;
                })
                .filter(post -> {
                    if (filter.getVisibility() != null) {
                        return post.getVisibility().equals(filter.getVisibility());
                    }
                    return true;
                })
                .filter(post -> {
                    if (filter.getSearch() != null && !filter.getSearch().isEmpty()) {
                        String search = filter.getSearch().toLowerCase();
                        return post.getTitle().toLowerCase().contains(search) ||
                               post.getDescription().toLowerCase().contains(search);
                    }
                    return true;
                })
                .map(post -> mapPostToResponseDTO(post, currentUserId))
                .collect(Collectors.toList());
    }

    /**
     * Get single post by ID
     */
    public PostResponseDTO getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        Long currentUserId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return mapPostToResponseDTO(post, currentUserId);
    }

    /**
     * Update post
     */
    public BasicResponse updatePost(Long postId, PostUpdateDTO dto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Long currentUserId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!post.getAuthor().getUserId().equals(currentUserId)) {
            throw new RuntimeException("Unauthorized to update this post");
        }

        post.setTitle(dto.getTitle());
        post.setDescription(dto.getDesc());
        post.setVisibility(dto.getVisibility());
        post.setUpdatedAt(LocalDateTime.now());
        post.setUpdatedBy(findUserById(currentUserId));

        if (dto.getTagIds() != null && !dto.getTagIds().isEmpty()) {
            Set<Tag> tags = new HashSet<>(tagRepository.findAllById(dto.getTagIds()));
            post.setTags(tags);
        }

        if (dto.getMainDocumentId() != null) {
            Document doc = documentRepository.findById(dto.getMainDocumentId())
                    .orElseThrow(() -> new RuntimeException("Document not found"));
            post.setMainDocument(doc);
        }

        postRepository.save(post);
        log.info("Post updated: {}", postId);

        return new BasicResponse("Post updated successfully");
    }

    /**
     * Soft delete post (Author or HR)
     * HR deletion sends contentWarningEmailTemplate to author
     */
    public BasicResponse deletePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Long currentUserId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = findUserById(currentUserId);
        
        // Check if user is author or HR
        boolean isAuthor = post.getAuthor() != null && post.getAuthor().getUserId().equals(currentUserId);
        boolean isHR = SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .stream().anyMatch(auth -> auth.getAuthority().equals("manage-post"));
        
        if (!isAuthor && !isHR) {
            throw new RuntimeException("Unauthorized: You can only delete your own posts");
        }

        post.setIsActive(false);
        post.setUpdatedAt(LocalDateTime.now());
        post.setUpdatedBy(currentUser);
        post.setDeletedBy(currentUser);
        postRepository.save(post);
        
        // Send email notification only if HR deletes
        if (isHR && !isAuthor && post.getAuthor() != null) {
            String emailBody = MailTemplateUtil.contentWarningEmailTemplate("Post", post.getTitle());
            emailService.sendMail(List.of(post.getAuthor().getCompanyEmail()), 
                    "Content Warning - Post Deleted", emailBody);
            log.info("Content warning email sent to author: {}", post.getAuthor().getUserId());
        }
        
        // Notify author of deletion
        if (post.getAuthor() != null) {
            sendNotificationToUser(post.getAuthor(), "Post Deleted", 
                    "Your post '" + post.getTitle() + "' has been deleted");
        }

        log.info("Post soft deleted: {} by user: {}", postId, currentUserId);

        return new BasicResponse("Post deleted successfully");
    }

    /**
     * Like/Unlike post
     */
    public BasicResponse toggleLikePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Long currentUserId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = findUserById(currentUserId);

        Like existingLike = likeRepository.findAll().stream()
                .filter(like -> like.getPost() != null && like.getPost().getPkPostId().equals(postId) &&
                        like.getUser().getUserId().equals(currentUserId))
                .findFirst()
                .orElse(null);

        if (existingLike != null) {
            likeRepository.delete(existingLike);
            log.info("Post unlike: {} by user: {}", postId, currentUserId);
        } else {
            Like like = new Like();
            like.setPost(post);
            like.setUser(currentUser);
            like.setLikeAt(LocalDateTime.now());
            likeRepository.save(like);
            
            // Notify post author
            if (post.getAuthor() != null && !post.getAuthor().getUserId().equals(currentUserId)) {
                sendNotificationToUser(post.getAuthor(), "New Like", 
                        currentUser.getUserName() + " liked your post: " + post.getTitle());
            }
            
            log.info("Post liked: {} by user: {}", postId, currentUserId);
        }

        return new BasicResponse("Like toggled successfully");
    }

    // ==================== COMMENT OPERATIONS ====================

    /**
     * Add comment to post
     */
    public BasicResponse addCommentToPost(Long postId, CommentCreateDTO dto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Long currentUserId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User author = findUserById(currentUserId);

        Comment comment = new Comment();
        comment.setPost(post);
        comment.setAuthor(author);
        comment.setDescription(dto.getDesc());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setIsActive(true);

        commentRepository.save(comment);
        log.info("Comment added to post: {}", postId);

        // Notify post author
        if (post.getAuthor() != null && !post.getAuthor().getUserId().equals(currentUserId)) {
            sendNotificationToUser(post.getAuthor(), "New Comment", 
                    author.getUserName() + " commented on your post: " + post.getTitle());
        }

        return new BasicResponse("Comment added successfully");
    }

    /**
     * Reply to comment (nested comment)
     */
    public BasicResponse replyToComment(Long parentCommentId, CommentCreateDTO dto) {
        Comment parentComment = commentRepository.findById(parentCommentId)
                .orElseThrow(() -> new RuntimeException("Parent comment not found"));

        Long currentUserId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User author = findUserById(currentUserId);

        Comment reply = new Comment();
        reply.setPost(parentComment.getPost());
        reply.setAuthor(author);
        reply.setParentComment(parentComment);
        reply.setDescription(dto.getDesc());
        reply.setCreatedAt(LocalDateTime.now());
        reply.setIsActive(true);

        commentRepository.save(reply);
        log.info("Reply added to comment: {}", parentCommentId);

        // Notify parent comment author
        if (!parentComment.getAuthor().getUserId().equals(currentUserId)) {
            sendNotificationToUser(parentComment.getAuthor(), "New Reply", 
                    author.getUserName() + " replied to your comment");
        }

        return new BasicResponse("Reply added successfully");
    }

    /**
     * Update comment
     */
    public BasicResponse updateComment(Long commentId, CommentUpdateDTO dto) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        Long currentUserId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!comment.getAuthor().getUserId().equals(currentUserId)) {
            throw new RuntimeException("Unauthorized to update this comment");
        }

        comment.setDescription(dto.getDesc());
        commentRepository.save(comment);
        log.info("Comment updated: {}", commentId);

        return new BasicResponse("Comment updated successfully");
    }

    /**
     * Soft delete comment (Author or HR)
     * HR deletion sends contentWarningEmailTemplate to author
     */
    public BasicResponse deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        Long currentUserId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = findUserById(currentUserId);

        // Check if user is author or HR
        boolean isAuthor = comment.getAuthor() != null && comment.getAuthor().getUserId().equals(currentUserId);
        boolean isHR = SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .stream().anyMatch(auth -> auth.getAuthority().equals("manage-post"));
        
        if (!isAuthor && !isHR) {
            throw new RuntimeException("Unauthorized: You can only delete your own comments");
        }

        comment.setIsActive(false);
        comment.setDeletedBy(currentUser);
        commentRepository.save(comment);

        // Send email notification only if HR deletes
        if (isHR && !isAuthor && comment.getAuthor() != null) {
            String emailBody = MailTemplateUtil.contentWarningEmailTemplate("Comment", 
                    comment.getPost() != null ? comment.getPost().getTitle() : "Unknown");
            emailService.sendMail(List.of(comment.getAuthor().getCompanyEmail()), 
                    "Content Warning - Comment Deleted", emailBody);
            log.info("Content warning email sent to comment author: {}", comment.getAuthor().getUserId());
        }

        // Notify comment author
        if (comment.getAuthor() != null) {
            sendNotificationToUser(comment.getAuthor(), "Comment Deleted", 
                    "Your comment has been deleted "+comment.getDescription());
        }

        log.info("Comment soft deleted: {} by user: {}", commentId, currentUserId);

        return new BasicResponse("Comment deleted successfully");
    }

    /**
     * Like/Unlike comment
     */
    public BasicResponse toggleLikeComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        Long currentUserId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = findUserById(currentUserId);

        Like existingLike = likeRepository.findAll().stream()
                .filter(like -> like.getComment() != null && like.getComment().getPkCommentId().equals(commentId) &&
                        like.getUser().getUserId().equals(currentUserId))
                .findFirst()
                .orElse(null);

        if (existingLike != null) {
            likeRepository.delete(existingLike);
            log.info("Comment unlike: {} by user: {}", commentId, currentUserId);
        } else {
            Like like = new Like();
            like.setComment(comment);
            like.setUser(currentUser);
            like.setLikeAt(LocalDateTime.now());
            likeRepository.save(like);

            // Notify comment author
            if (!comment.getAuthor().getUserId().equals(currentUserId)) {
                sendNotificationToUser(comment.getAuthor(), "New Like on Comment", 
                        currentUser.getUserName() + " liked your comment");
            }

            log.info("Comment liked: {} by user: {}", commentId, currentUserId);
        }

        return new BasicResponse("Like toggled successfully");
    }

    /**
     * Get comments for post
     */
    public List<CommentResponseDTO> getCommentsForPost(Long postId) {
        List<Comment> comments = commentRepository.findAll().stream()
                .filter(c -> c.getPost().getPkPostId().equals(postId) && 
                        c.getParentComment() == null && c.getIsActive())
                .collect(Collectors.toList());

        Long currentUserId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return comments.stream()
                .map(comment -> mapCommentToResponseDTO(comment, currentUserId))
                .collect(Collectors.toList());
    }

    // ==================== TAG OPERATIONS ====================

    /**
     * Create a new tag (any user can create)
     */
    public BasicResponse createTag(TagCreateDTO dto) {
        Long currentUserId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User createdBy = findUserById(currentUserId);

        Tag tag = new Tag();
        tag.setTagName(dto.getTagName());
        tag.setCreatedBy(createdBy);

        tagRepository.save(tag);
        log.info("Tag created: {} by user: {}", dto.getTagName(), currentUserId);

        return new BasicResponse("Tag created successfully");
    }

    /**
     * Get all tags
     */
    public List<TagResponseDTO> getAllTags() {
        return tagRepository.findAll().stream()
                .map(this::mapTagToResponseDTO)
                .collect(Collectors.toList());
    }

    // ==================== HELPER METHODS ====================

    /**
     * Map Post entity to PostResponseDTO using ModelMapper
     */
    private PostResponseDTO mapPostToResponseDTO(Post post, Long currentUserId) {
        PostResponseDTO dto = new PostResponseDTO();
        
        dto.setPkPostId(post.getPkPostId());
        dto.setTitle(post.getTitle());
        dto.setDescription(post.getDescription());
        dto.setVisibility(post.getVisibility());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setIsActive(post.getIsActive());
        dto.setUpdatedAt(post.getUpdatedAt());

        if (post.getAuthor() != null) {
            dto.setAuthorId(post.getAuthor().getUserId());
            dto.setAuthorName(post.getAuthor().getUserName());
            dto.setAuthorImageUrl(post.getAuthor().getImageUrl());
        }

        if (post.getUpdatedBy() != null) {
            dto.setUpdatedBy(post.getUpdatedBy().getUserId());
        }

        if (post.getCreatedFor() != null) {
            dto.setCreatedFor(post.getCreatedFor().getUserId());
        }

        if (post.getMainDocument() != null) {
            dto.setMainDocumentUrl(post.getMainDocument().getUrl());
        }

        // Map tags
        if (post.getTags() != null) {
            dto.setTags(post.getTags().stream()
                    .map(this::mapTagToResponseDTO)
                    .collect(Collectors.toSet()));
        }

        // Get likes count
        long likesCount = likeRepository.findAll().stream()
                .filter(like -> like.getPost() != null && like.getPost().getPkPostId().equals(post.getPkPostId()))
                .count();
        dto.setLikesCount((int) likesCount);

        long commentsCount = commentRepository.findAll().stream()
                .filter(comment -> comment.getPost().getPkPostId().equals(post.getPkPostId()) &&
                        comment.getParentComment() == null && comment.getIsActive())
                .count();
        dto.setCommentsCount((int) commentsCount);
        return dto;
    }

    /**
     * Map Comment entity to CommentResponseDTO using ModelMapper
     */
    private CommentResponseDTO mapCommentToResponseDTO(Comment comment, Long currentUserId) {
        CommentResponseDTO dto = new CommentResponseDTO();
        
        dto.setPkCommentId(comment.getPkCommentId());
        dto.setDescription(comment.getDescription());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setIsActive(comment.getIsActive());
        
        if (comment.getAuthor() != null) {
            dto.setAuthorId(comment.getAuthor().getUserId());
            dto.setAuthorName(comment.getAuthor().getUserName());
            dto.setAuthorImageUrl(comment.getAuthor().getImageUrl());
        }

        if (comment.getParentComment() != null) {
            dto.setParentCommentId(comment.getParentComment().getPkCommentId());
        }

        // Get replies (child comments)
        List<Comment> replies = commentRepository.findAll().stream()
                .filter(c -> c.getParentComment() != null && 
                        c.getParentComment().getPkCommentId().equals(comment.getPkCommentId()) &&
                        c.getIsActive())
                .collect(Collectors.toList());

        if (!replies.isEmpty()) {
            dto.setReplies(replies.stream()
                    .map(reply -> mapCommentToResponseDTO(reply, currentUserId))
                    .collect(Collectors.toList()));
        }

        // Get likes count
        long likesCount = likeRepository.findAll().stream()
                .filter(like -> like.getComment() != null && like.getComment().getPkCommentId().equals(comment.getPkCommentId()))
                .count();
        dto.setLikesCount((int) likesCount);

        // Check if liked by current user
        boolean likedByCurrentUser = likeRepository.findAll().stream()
                .anyMatch(like -> like.getComment() != null && like.getComment().getPkCommentId().equals(comment.getPkCommentId()) &&
                        like.getUser().getUserId().equals(currentUserId));
        dto.setLikedByCurrentUser(likedByCurrentUser);

        return dto;
    }

    /**
     * Map Tag entity to TagResponseDTO using ModelMapper
     */
    private TagResponseDTO mapTagToResponseDTO(Tag tag) {
        TagResponseDTO dto = modelMapper.map(tag, TagResponseDTO.class);
        

        
        return dto;
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private void sendNotificationToUser(User user, String title, String description) {
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setDescription(description);
        notification.setUser(user);
        notificationRepository.save(notification);
    }
}
