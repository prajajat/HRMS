# Achievement Feed Module - API Documentation

## Base URL
```
/achievement
```

---

## 1. POST ENDPOINTS

### 1.1 Create Post
**Endpoint:** `POST /achievement/post/create`

**Permission:** `All-User`

**Request Format:** `multipart/form-data`

**Request Body:**
```json
{
  "postData": {
    "title": "string",                    // Post title
    "desc": "string",                     // Post description
    "visibility": "string",               // all, department, manager, private
    "tagIds": [1, 2, 3]                  // Optional array of tag IDs
    "mainDocumentId": 5                   // Optional document ID
  },
  "mainDocument": "file"                  // Optional file upload
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Post created successfully"
}
```

---

### 1.2 Get All Posts / Feed
**Endpoint:** `GET /achievement/post/all`

**Permission:** `All-User`

**Query Parameters:**
```
?tagId=1&authorId=5&startDate=2026-02-01T00:00:00&endDate=2026-02-28T23:59:59&visibility=all&search=keyword
```

**Response Body:**
```json
[
  {
    "pkPostId": 1,
    "authorId": 100,
    "authorName": "John Doe",
    "title": "Achievement Title",
    "desc": "Achievement description",
    "visibility": "all",
    "createdAt": "2026-02-22T10:30:00",
    "isActive": true,
    "updatedAt": "2026-02-22T10:30:00",
    "updatedBy": 100,
    "createdFor": 100,                   // For system posts (birthdays/anniversaries)
    "mainDocumentId": 5,
    "tags": [
      {
        "pkTagId": 1,
        "tagName": "Achievement",
        "createdBy": 100,
        "createdByName": "Admin"
      }
    ],
    "likesCount": 15,
    "commentsCount": 3,
    "likedByCurrentUser": true
  }
]
```

---

### 1.3 Get Single Post
**Endpoint:** `GET /achievement/post/{postId}`

**Permission:** `All-User`

**Path Parameters:**
```
postId: Long (e.g., 1)
```

**Response:**
Same as 1.2 (single post object, not array)

---

### 1.4 Update Post
**Endpoint:** `PUT /achievement/post/{postId}`

**Permission:** `All-User`

**Path Parameters:**
```
postId: Long (e.g., 1)
```

**Request Format:** `multipart/form-data`

**Request Body:**
```json
{
  "postData": {
    "title": "Updated Title",
    "desc": "Updated description",
    "visibility": "department",
    "tagIds": [1, 2],
    "mainDocumentId": 6
  },
  "mainDocument": "file"                  // Optional
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Post updated successfully"
}
```

---

### 1.5 Delete Post
**Endpoint:** `DELETE /achievement/post/{postId}`

**Permission:** `manage-post` (HR Only)

**Path Parameters:**
```
postId: Long (e.g., 1)
```

**Response:**
```json
{
  "status": "success",
  "message": "Post deleted successfully"
}
```

---

### 1.6 Like/Unlike Post
**Endpoint:** `POST /achievement/post/{postId}/like`

**Permission:** `All-User`

**Path Parameters:**
```
postId: Long (e.g., 1)
```

**Request Body:** Empty

**Response:**
```json
{
  "status": "success",
  "message": "Like toggled successfully"
}
```

---

## 2. COMMENT ENDPOINTS

### 2.1 Add Comment to Post
**Endpoint:** `POST /achievement/comment/post/{postId}`

**Permission:** `All-User`

**Path Parameters:**
```
postId: Long (e.g., 1)
```

**Request Body:**
```json
{
  "desc": "This is a comment",
  "parentCommentId": null               // null for top-level comments
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Comment added successfully"
}
```

---

### 2.2 Reply to Comment (Nested)
**Endpoint:** `POST /achievement/comment/{commentId}/reply`

**Permission:** `All-User`

**Path Parameters:**
```
commentId: Long (e.g., 10)
```

**Request Body:**
```json
{
  "desc": "This is a reply to the comment",
  "parentCommentId": 10                // Reference to parent comment
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Reply added successfully"
}
```

---

### 2.3 Update Comment
**Endpoint:** `PUT /achievement/comment/{commentId}`

**Permission:** `All-User` (Author Only)

**Path Parameters:**
```
commentId: Long (e.g., 10)
```

**Request Body:**
```json
{
  "desc": "Updated comment text"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Comment updated successfully"
}
```

---

### 2.4 Delete Comment
**Endpoint:** `DELETE /achievement/comment/{commentId}`

**Permission:** `manage-post` (HR Only)

**Path Parameters:**
```
commentId: Long (e.g., 10)
```

**Response:**
```json
{
  "status": "success",
  "message": "Comment deleted successfully"
}
```

---

### 2.5 Like/Unlike Comment
**Endpoint:** `POST /achievement/comment/{commentId}/like`

**Permission:** `All-User`

**Path Parameters:**
```
commentId: Long (e.g., 10)
```

**Request Body:** Empty

**Response:**
```json
{
  "status": "success",
  "message": "Like toggled successfully"
}
```

---

### 2.6 Get All Comments for Post
**Endpoint:** `GET /achievement/comment/post/{postId}`

**Permission:** `All-User`

**Path Parameters:**
```
postId: Long (e.g., 1)
```

**Response:**
```json
[
  {
    "pkCommentId": 10,
    "authorId": 101,
    "authorName": "Jane Smith",
    "desc": "Great achievement!",
    "createdAt": "2026-02-22T11:00:00",
    "isActive": true,
    "parentCommentId": null,             // null for top-level
    "replies": [
      {
        "pkCommentId": 11,
        "authorId": 102,
        "authorName": "Bob Wilson",
        "desc": "Thanks!",
        "createdAt": "2026-02-22T11:15:00",
        "isActive": true,
        "parentCommentId": 10,
        "replies": [],
        "likesCount": 2,
        "likedByCurrentUser": false
      }
    ],
    "likesCount": 5,
    "likedByCurrentUser": true
  }
]
```

---

## 3. TAG ENDPOINTS

### 3.1 Create Tag
**Endpoint:** `POST /achievement/tag/create`

**Permission:** `All-User`

**Request Body:**
```json
{
  "tagName": "Achievement"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Tag created successfully"
}
```

---

### 3.2 Get All Tags
**Endpoint:** `GET /achievement/tag/all`

**Permission:** `All-User`

**Response:**
```json
[
  {
    "pkTagId": 1,
    "tagName": "Achievement",
    "createdBy": 100,
    "createdByName": "Admin"
  },
  {
    "pkTagId": 2,
    "tagName": "Recognition",
    "createdBy": 101,
    "createdByName": "Manager"
  }
]
```

---

## 4. REQUEST DTOs SUMMARY

### PostCreateDTO
```java
{
  title: String,
  desc: String,
  visibility: String,
  tagIds: Set<Long>,
  mainDocumentId: Long
}
```

### PostUpdateDTO
```java
{
  title: String,
  desc: String,
  visibility: String,
  tagIds: Set<Long>,
  mainDocumentId: Long
}
```

### PostFilterDTO
```java
{
  tagId: Long,
  authorId: Long,
  startDate: LocalDateTime,
  endDate: LocalDateTime,
  visibility: String,
  search: String
}
```

### CommentCreateDTO
```java
{
  desc: String,
  parentCommentId: Long
}
```

### CommentUpdateDTO
```java
{
  desc: String
}
```

### TagCreateDTO
```java
{
  tagName: String
}
```

---

## 5. RESPONSE DTOs SUMMARY

### PostResponseDTO
```java
{
  pkPostId: Long,
  authorId: Long,
  authorName: String,
  title: String,
  desc: String,
  visibility: String,
  createdAt: LocalDateTime,
  isActive: Boolean,
  updatedAt: LocalDateTime,
  updatedBy: Long,
  createdFor: Long,
  mainDocumentId: Long,
  tags: Set<TagResponseDTO>,
  likesCount: Integer,
  commentsCount: Integer,
  likedByCurrentUser: Boolean
}
```

### CommentResponseDTO
```java
{
  pkCommentId: Long,
  authorId: Long,
  authorName: String,
  desc: String,
  createdAt: LocalDateTime,
  isActive: Boolean,
  parentCommentId: Long,
  replies: List<CommentResponseDTO>,
  likesCount: Integer,
  likedByCurrentUser: Boolean
}
```

### TagResponseDTO
```java
{
  pkTagId: Long,
  tagName: String,
  createdBy: Long,
  createdByName: String
}
```

### BasicResponse
```java
{
  status: String (success/error),
  message: String
}
```

---

## 6. AUTOMATIC SYSTEM POSTS

**Scheduler:** `AchievementScheduler`

**Runs:** Every 24 hours at midnight (cron: `0 0 0 * * *`)

**Auto-generates posts for:**
1. **Birthdays** - Uses SystemConfig key: `birthday_post_template` & `birthday_post_document_id`
2. **Work Anniversaries** - Uses SystemConfig key: `anniversary_post_template` & `anniversary_post_document_id`

**System Post Characteristics:**
- `author`: null
- `createdFor`: Employee being celebrated
- `visibility`: "all"
- `isActive`: true
- Auto-attached main document if configured

---

## 7. PERMISSIONS MATRIX

| Endpoint | Action | All-User | manage-post | Notes |
|----------|--------|----------|-------------|-------|
| Create Post | Create | ✅ | | Any user can create |
| Get Feed | Read | ✅ | | Filtered results |
| Get Post | Read | ✅ | | Single post details |
| Update Post | Update | ✅ | | Author only |
| Delete Post | Delete | | ✅ | HR only, soft delete |
| Like Post | Create | ✅ | | Auto-notifies author |
| Add Comment | Create | ✅ | | Auto-notifies author |
| Reply Comment | Create | ✅ | | Auto-notifies parent author |
| Update Comment | Update | ✅ | | Author only |
| Delete Comment | Delete | | ✅ | HR only, soft delete |
| Like Comment | Create | ✅ | | Auto-notifies author |
| Get Comments | Read | ✅ | | Thread view |
| Create Tag | Create | ✅ | | Any user |
| Get Tags | Read | ✅ | | All tags |

---

## 8. NOTIFICATIONS TRIGGERED

| Action | Triggered | Recipient | Message |
|--------|-----------|-----------|---------|
| Post Liked | Yes | Post Author | "{User} liked your post: {Title}" |
| Comment Added | Yes | Post Author | "{User} commented on your post: {Title}" |
| Comment Replied | Yes | Parent Comment Author | "{User} replied to your comment" |
| Comment Liked | Yes | Comment Author | "{User} liked your comment" |
| Post Deleted by HR | Yes | Post Author | "Your post '{Title}' has been deleted by HR" |
| Comment Deleted by HR | Yes | Comment Author | "Your comment has been deleted by HR" |

---

## 9. DATABASE CONSTRAINTS

| Table | Constraint | Details |
|-------|-----------|---------|
| likes | UNIQUE | (fk_post_id, fk_user_id) - Users can like each post once |
| likes | UNIQUE | (fk_comment_id, fk_user_id) - Users can like each comment once |
| post | Soft Delete | isActive = false (not physically deleted) |
| comments | Soft Delete | isActive = false (not physically deleted) |

---

## 10. ERROR HANDLING

All endpoints return error responses in format:
```json
{
  "status": "error",
  "message": "Specific error message"
}
```

Common HTTP Status Codes:
- `200 OK` - Successful operation
- `401 Unauthorized` - Missing authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `400 Bad Request` - Invalid input

---

**Status:** ✅ Complete and Ready for Integration

