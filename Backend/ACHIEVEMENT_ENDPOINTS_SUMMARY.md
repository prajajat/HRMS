# Achievement Feed - Endpoints Summary

## Quick Reference

### 1. Create Post
**Endpoint:** `POST /achievement/post/create`  
**Permission:** `All-User`

**Request DTO - PostCreateDTO:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | ✅ | Post title |
| desc | String | ✅ | Post description |
| visibility | String | ✅ | all, department, manager, private |
| tagIds | Set<Long> | ❌ | Array of tag IDs |
| mainDocumentId | Long | ❌ | Document ID for attachment |
| mainDocument | File | ❌ | File upload (multipart) |

**Response DTO - BasicResponse:**
| Field | Type | Description |
|-------|------|-------------|
| status | String | "success" or "error" |
| message | String | Response message |

---

### 2. Get Feed (All Posts)
**Endpoint:** `GET /achievement/post/all`  
**Permission:** `All-User`

**Request DTO - PostFilterDTO (Query Params):**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| tagId | Long | ❌ | Filter by tag |
| authorId | Long | ❌ | Filter by author |
| startDate | LocalDateTime | ❌ | Filter from date |
| endDate | LocalDateTime | ❌ | Filter to date |
| visibility | String | ❌ | Filter by visibility |
| search | String | ❌ | Filter by keyword |

**Response DTO - List<PostResponseDTO>:**
| Field | Type | Description |
|-------|------|-------------|
| pkPostId | Long | Post ID |
| authorId | Long | Author user ID |
| authorName | String | Author name |
| title | String | Post title |
| desc | String | Post description |
| visibility | String | Visibility level |
| createdAt | LocalDateTime | Creation timestamp |
| isActive | Boolean | Active status |
| updatedAt | LocalDateTime | Last updated timestamp |
| updatedBy | Long | Updated by user ID |
| createdFor | Long | For system posts (celebrations) |
| mainDocumentId | Long | Attached document ID |
| tags | Set<TagResponseDTO> | Associated tags |
| likesCount | Integer | Total likes |
| commentsCount | Integer | Total comments |
| likedByCurrentUser | Boolean | Current user liked |

---

### 3. Get Single Post
**Endpoint:** `GET /achievement/post/{postId}`  
**Permission:** `All-User`

**Request:** 
| Param | Type | Description |
|-------|------|-------------|
| postId | Long | Post ID (path variable) |

**Response DTO - PostResponseDTO:**
(Same as endpoint 2)

---

### 4. Update Post
**Endpoint:** `PUT /achievement/post/{postId}`  
**Permission:** `All-User`

**Request DTO - PostUpdateDTO:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | ✅ | Updated title |
| desc | String | ✅ | Updated description |
| visibility | String | ✅ | Updated visibility |
| tagIds | Set<Long> | ❌ | Updated tag IDs |
| mainDocumentId | Long | ❌ | Updated document ID |
| mainDocument | File | ❌ | Updated file (multipart) |

**Path Param:**
| Param | Type | Description |
|-------|------|-------------|
| postId | Long | Post ID to update |

**Response DTO - BasicResponse:**
(Same as endpoint 1)

---

### 5. Delete Post
**Endpoint:** `DELETE /achievement/post/{postId}`  
**Permission:** `manage-post` (HR Only)

**Request:** 
| Param | Type | Description |
|-------|------|-------------|
| postId | Long | Post ID to delete |

**Response DTO - BasicResponse:**
(Same as endpoint 1)

---

### 6. Like/Unlike Post
**Endpoint:** `POST /achievement/post/{postId}/like`  
**Permission:** `All-User`

**Request:** 
| Param | Type | Description |
|-------|------|-------------|
| postId | Long | Post ID to like |

**Response DTO - BasicResponse:**
(Same as endpoint 1)

---

### 7. Add Comment to Post
**Endpoint:** `POST /achievement/comment/post/{postId}`  
**Permission:** `All-User`

**Request DTO - CommentCreateDTO:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| desc | String | ✅ | Comment text |
| parentCommentId | Long | ❌ | Parent comment ID (null for top-level) |

**Path Param:**
| Param | Type | Description |
|-------|------|-------------|
| postId | Long | Post ID to comment on |

**Response DTO - BasicResponse:**
(Same as endpoint 1)

---

### 8. Reply to Comment
**Endpoint:** `POST /achievement/comment/{commentId}/reply`  
**Permission:** `All-User`

**Request DTO - CommentCreateDTO:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| desc | String | ✅ | Reply text |
| parentCommentId | Long | ✅ | Parent comment ID |

**Path Param:**
| Param | Type | Description |
|-------|------|-------------|
| commentId | Long | Comment ID to reply to |

**Response DTO - BasicResponse:**
(Same as endpoint 1)

---

### 9. Update Comment
**Endpoint:** `PUT /achievement/comment/{commentId}`  
**Permission:** `All-User`

**Request DTO - CommentUpdateDTO:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| desc | String | ✅ | Updated comment text |

**Path Param:**
| Param | Type | Description |
|-------|------|-------------|
| commentId | Long | Comment ID to update |

**Response DTO - BasicResponse:**
(Same as endpoint 1)

---

### 10. Delete Comment
**Endpoint:** `DELETE /achievement/comment/{commentId}`  
**Permission:** `manage-post` (HR Only)

**Request:** 
| Param | Type | Description |
|-------|------|-------------|
| commentId | Long | Comment ID to delete |

**Response DTO - BasicResponse:**
(Same as endpoint 1)

---

### 11. Like/Unlike Comment
**Endpoint:** `POST /achievement/comment/{commentId}/like`  
**Permission:** `All-User`

**Request:** 
| Param | Type | Description |
|-------|------|-------------|
| commentId | Long | Comment ID to like |

**Response DTO - BasicResponse:**
(Same as endpoint 1)

---

### 12. Get Comments for Post
**Endpoint:** `GET /achievement/comment/post/{postId}`  
**Permission:** `All-User`

**Request:** 
| Param | Type | Description |
|-------|------|-------------|
| postId | Long | Post ID to get comments for |

**Response DTO - List<CommentResponseDTO>:**
| Field | Type | Description |
|-------|------|-------------|
| pkCommentId | Long | Comment ID |
| authorId | Long | Author user ID |
| authorName | String | Author name |
| desc | String | Comment text |
| createdAt | LocalDateTime | Creation timestamp |
| isActive | Boolean | Active status |
| parentCommentId | Long | Parent comment ID (null if top-level) |
| replies | List<CommentResponseDTO> | Nested replies (recursive) |
| likesCount | Integer | Total likes on comment |
| likedByCurrentUser | Boolean | Current user liked |

---

### 13. Create Tag
**Endpoint:** `POST /achievement/tag/create`  
**Permission:** `All-User`

**Request DTO - TagCreateDTO:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| tagName | String | ✅ | Tag name |

**Response DTO - BasicResponse:**
(Same as endpoint 1)

---

### 14. Get All Tags
**Endpoint:** `GET /achievement/tag/all`  
**Permission:** `All-User`

**Request:** None

**Response DTO - List<TagResponseDTO>:**
| Field | Type | Description |
|-------|------|-------------|
| pkTagId | Long | Tag ID |
| tagName | String | Tag name |
| createdBy | Long | Creator user ID |
| createdByName | String | Creator name |

---

## DTO Summary Reference

### Request DTOs

#### PostCreateDTO
```json
{
  "title": "string",
  "desc": "string", 
  "visibility": "all|department|manager|private",
  "tagIds": [1, 2, 3],
  "mainDocumentId": 5
}
```

#### PostUpdateDTO
```json
{
  "title": "string",
  "desc": "string",
  "visibility": "all|department|manager|private",
  "tagIds": [1, 2, 3],
  "mainDocumentId": 5
}
```

#### PostFilterDTO (Query)
```json
{
  "tagId": 1,
  "authorId": 100,
  "startDate": "2026-02-01T00:00:00",
  "endDate": "2026-02-28T23:59:59",
  "visibility": "all",
  "search": "keyword"
}
```

#### CommentCreateDTO
```json
{
  "desc": "string",
  "parentCommentId": null
}
```

#### CommentUpdateDTO
```json
{
  "desc": "string"
}
```

#### TagCreateDTO
```json
{
  "tagName": "string"
}
```

### Response DTOs

#### PostResponseDTO
```json
{
  "pkPostId": 1,
  "authorId": 100,
  "authorName": "John Doe",
  "title": "string",
  "desc": "string",
  "visibility": "all",
  "createdAt": "2026-02-22T10:30:00",
  "isActive": true,
  "updatedAt": "2026-02-22T10:30:00",
  "updatedBy": 100,
  "createdFor": 100,
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
```

#### CommentResponseDTO
```json
{
  "pkCommentId": 10,
  "authorId": 101,
  "authorName": "Jane Smith",
  "desc": "string",
  "createdAt": "2026-02-22T11:00:00",
  "isActive": true,
  "parentCommentId": null,
  "replies": [
    {
      "pkCommentId": 11,
      "authorId": 102,
      "authorName": "Bob Wilson",
      "desc": "string",
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
```

#### TagResponseDTO
```json
{
  "pkTagId": 1,
  "tagName": "Achievement",
  "createdBy": 100,
  "createdByName": "Admin"
}
```

#### BasicResponse
```json
{
  "status": "success",
  "message": "Operation completed successfully"
}
```

---

## Permissions Summary

| Endpoint | All-User | manage-post |
|----------|----------|-------------|
| Create Post | ✅ | |
| Get Feed | ✅ | |
| Get Post | ✅ | |
| Update Post | ✅ | |
| Delete Post | | ✅ |
| Like Post | ✅ | |
| Add Comment | ✅ | |
| Reply Comment | ✅ | |
| Update Comment | ✅ | |
| Delete Comment | | ✅ |
| Like Comment | ✅ | |
| Get Comments | ✅ | |
| Create Tag | ✅ | |
| Get Tags | ✅ | |

---

## Features

✅ **14 RESTful Endpoints**  
✅ **Role-Based Access Control** - All-User & manage-post permissions  
✅ **File Uploads** - Cloudinary integration for post documents  
✅ **Nested Comments** - Unlimited depth replies  
✅ **Like System** - Unique constraint per user  
✅ **Feed Filtering** - By tag, author, date range, visibility, search  
✅ **Soft Deletes** - HR moderation without data loss  
✅ **Automatic Notifications** - For likes, comments, and deletions  
✅ **System Posts** - Birthday & Work Anniversary celebrations  
✅ **Tag Management** - User-created achievement tags  

---

**Status:** ✅ Production Ready
