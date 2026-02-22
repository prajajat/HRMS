# Achievement Feed Module - Implementation Summary

## Overview
A complete social feed system for employees to share achievements, comment, and engage through likes. Supports system-generated posts for birthdays and work anniversaries.

---

## Entities Created

### 1. **Post** 
- Stores achievement posts with title, description, visibility settings
- Supports tags (many-to-many relationship)
- Can attach main document (image/certificate)
- Soft delete capability
- Tracks author, updatedBy, and createdFor (for system posts)

### 2. **Tag**
- Simple tagging system for posts
- Any user can create tags
- Tracks creator

### 3. **Comment**
- Supports nested comments (replies to comments)
- Unlimited nesting depth
- Soft delete capability
- Tracks author and post

### 4. **Like**
- Unique constraint per user per post/comment (enforced at DB level)
- Tracks like timestamp

---

## DTOs Created

### Request DTOs
- `PostCreateDTO` - Create post with tags and optional document
- `PostFilterDTO` - Filter posts by tag, author, date range, visibility, search
- `PostUpdateDTO` - Update post details
- `CommentCreateDTO` - Add comment or reply
- `CommentUpdateDTO` - Update comment text
- `TagCreateDTO` - Create new tag

### Response DTOs
- `PostResponseDTO` - Post with metadata (likes count, liked by current user, comments count, tags)
- `CommentResponseDTO` - Comment with nested replies and likes info
- `TagResponseDTO` - Tag details with creator info

---

## Services Created

### 1. **PostService**
- `createPost()` - Create post with file upload to Cloudinary
- `getFeed()` - Get filtered feed (by tag, author, date, visibility, search)
- `getPostById()` - Get single post details
- `updatePost()` - Author can update their own posts
- `deletePost()` - Soft delete (HR only with manage-achievement permission)
- `toggleLikePost()` - Like/unlike post
- Sends notifications to post author when:
  - Someone likes their post
  - HR deletes their post

### 2. **CommentService**
- `addCommentToPost()` - Add top-level comment
- `replyToComment()` - Add nested reply
- `updateComment()` - Author can update own comments
- `deleteComment()` - Soft delete (HR only)
- `toggleLikeComment()` - Like/unlike comment
- `getCommentsForPost()` - Get all comments with nested replies
- Sends notifications to comment author when:
  - Someone likes their comment
  - Someone replies to their comment
  - HR deletes their comment

### 3. **TagService**
- `createTag()` - Create tag (any authenticated user)
- `getAllTags()` - Get all available tags

### 4. **AchievementScheduler**
- Auto-generates posts every 24 hours (midnight) for:
  - **Birthdays**: Checks date of birth matches, uses birthday template from SystemConfig
  - **Work Anniversaries**: Checks joining date anniversary, uses anniversary template from SystemConfig
- System posts have `author = null` and `createdFor = employee`
- Logs all scheduled activities

---

## Controllers Created

### 1. **PostController** (`/post`)
```
POST   /post/create         - Create post (multipart form with jobData + mainDocument)
GET    /post/all            - Get feed with filters
GET    /post/{postId}       - Get single post
PUT    /post/{postId}       - Update post (multipart form)
DELETE /post/{postId}       - Delete post (HR only)
POST   /post/{postId}/like  - Toggle like
```

### 2. **CommentController** (`/comment`)
```
POST   /comment/post/{postId}     - Add comment
POST   /comment/{commentId}/reply - Reply to comment
PUT    /comment/{commentId}       - Update comment
DELETE /comment/{commentId}       - Delete comment (HR only)
POST   /comment/{commentId}/like  - Toggle like
GET    /comment/post/{postId}     - Get all comments for post
```

### 3. **TagController** (`/tag`)
```
POST   /tag/create  - Create tag
GET    /tag/all     - Get all tags
```

---

## Security & Permissions

### Authentication
- `@PreAuthorize("isAuthenticated()")` - Most endpoints require authentication

### Authorization
- `@PreAuthorize("hasAuthority('manage-achievement')")` - Delete operations (HR only)

---

## Notification Triggers

Notifications are sent in these scenarios:
1. **Post Like** → Notify post author
2. **Comment Added** → Notify post author
3. **Comment Reply** → Notify parent comment author
4. **Comment Like** → Notify comment author
5. **Post Deleted by HR** → Notify original author
6. **Comment Deleted by HR** → Notify original author

---

## Database Design

### Tables
- `post` - Posts with visibility, soft delete, tags
- `tags` - Tags with creator
- `post_tag_maps` - Many-to-many relationship
- `comments` - Comments with parent_comment_id for nesting
- `likes` - Unique constraints for post/comment likes
- `notifications` - For sending notifications (existing system)

---

## File Upload Handling

Following JobService pattern:
- Files uploaded to **Cloudinary**
- Document entity created with:
  - URL from Cloudinary
  - File name
  - Owner type ("post")
  - Document type ("image")
  - Uploader info

---

## Next Steps

1. **Update User Entity** - Ensure `dateOfBirth` and `joiningDate` fields exist
2. **Add SystemConfig Keys** - Create config entries:
   - `birthday_post_template` - Template for birthday posts
   - `anniversary_post_template` - Template for anniversary posts
3. **Add Permission** - Create `manage-achievement` permission for HR moderation
4. **Test Endpoints** - Use Postman/Swagger to test APIs
5. **Frontend Integration** - Connect React frontend with these endpoints

---

## Statistics Tracked

- `likesCount` - Total likes on post/comment
- `commentsCount` - Total top-level comments on post
- `likedByCurrentUser` - Whether current user liked the post/comment
- `replies` - Nested comments under each comment

---

**Status**: ✅ Complete module ready for testing and integration
