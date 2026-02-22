# Achievement Feed - Quick Reference Guide

## 📌 File Imports Quick Reference

### API & Queries
```typescript
// API Client
import { achievementApi } from '@/Api/achievementApi';

// React Query Hooks
import {
  useGetAllPosts,
  useGetPost,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
  useLikePost,
  useGetComments,
  useAddComment,
  useReplyComment,
  useUpdateComment,
  useDeleteComment,
  useLikeComment,
  useGetAllTags,
  useCreateTag
} from '@/Query/achievementQueries';

// Types
import {
  Post,
  PostCreateDTO,
  PostUpdateDTO,
  PostFilterDTO,
  Comment,
  CommentCreateDTO,
  CommentUpdateDTO,
  Tag,
  TagCreateDTO,
  ApiResponse
} from '@/Types/achievement';
```

### Components
```typescript
// Main Pages
import { PostDashboard } from '@/Pages/PostDashboard';

// Components
import { PostCard } from '@/Components/PostCard';
import { CommentCard } from '@/Components/CommentCard';
import { PostListing } from '@/Components/PostListing';
import { CreatePostForm } from '@/Components/CreatePostForm';
import { CreateCommentForm } from '@/Components/CreateCommentForm';

// Styles
import styles from '@/Styles/achievement.module.css';
```

---

## 🗺️ Route Navigation

### Employee
```typescript
// Navigate to achievement feed
navigate('/employee/achievement/posts');

// In URL
http://localhost:5173/employee/achievement/posts
```

### HR
```typescript
// Navigate to achievement feed
navigate('/hr/achievement/posts');

// In URL
http://localhost:5173/hr/achievement/posts
```

### Sidebar Links Already Updated
```
EmployeeSidebar.tsx → Achievements → /employee/achievement/posts
HRSidebar.tsx       → Achievements → /hr/achievement/posts
```

---

## 📊 API Endpoints Used

| Method | Endpoint | Hook | File |
|--------|----------|------|------|
| GET | `/achievement/post/all` | `useGetAllPosts` | achievementQueries.ts |
| GET | `/achievement/post/{id}` | `useGetPost` | achievementQueries.ts |
| POST | `/achievement/post/create` | `useCreatePost` | achievementQueries.ts |
| PUT | `/achievement/post/{id}` | `useUpdatePost` | achievementQueries.ts |
| DELETE | `/achievement/post/{id}` | `useDeletePost` | achievementQueries.ts |
| POST | `/achievement/post/{id}/like` | `useLikePost` | achievementQueries.ts |
| GET | `/achievement/comment/post/{id}` | `useGetComments` | achievementQueries.ts |
| POST | `/achievement/comment/post/{id}` | `useAddComment` | achievementQueries.ts |
| POST | `/achievement/comment/{id}/reply` | `useReplyComment` | achievementQueries.ts |
| PUT | `/achievement/comment/{id}` | `useUpdateComment` | achievementQueries.ts |
| DELETE | `/achievement/comment/{id}` | `useDeleteComment` | achievementQueries.ts |
| POST | `/achievement/comment/{id}/like` | `useLikeComment` | achievementQueries.ts |
| POST | `/achievement/tag/create` | `useCreateTag` | achievementQueries.ts |
| GET | `/achievement/tag/all` | `useGetAllTags` | achievementQueries.ts |

---

## 🎯 Component Usage Examples

### Use PostDashboard (Full Feature Page)
```tsx
import { PostDashboard } from './Pages/PostDashboard';

// In employee route
<PostDashboard view="employee" />

// In HR route
<PostDashboard view="hr" />
```

### Use PostCard (Display Single Post)
```tsx
import { PostCard } from './Components/PostCard';
import { useGetAllPosts } from './Query/achievementQueries';

function MyComponent() {
  const { data: posts } = useGetAllPosts();
  
  return (
    <div>
      {posts?.map(post => (
        <PostCard 
          key={post.pkPostId}
          post={post}
          view="employee"
          onEdit={handleEdit}
          onCommentClick={handleCommentClick}
        />
      ))}
    </div>
  );
}
```

### Use CreatePostForm (Post Creation)
```tsx
import { CreatePostForm } from './Components/CreatePostForm';
import { useState } from 'react';

function PostCreator() {
  const [showForm, setShowForm] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowForm(true)}>Create Post</button>
      {showForm && (
        <CreatePostForm 
          onSuccess={() => setShowForm(false)}
          onCancel={() => setShowForm(false)}
        />
      )}
    </>
  );
}
```

### Use CommentCard (Display Comments)
```tsx
import { CommentCard } from './Components/CommentCard';
import { useGetComments } from './Query/achievementQueries';

function PostComments({ postId }) {
  const { data: comments } = useGetComments(postId);
  
  return (
    <div>
      {comments?.map(comment => (
        <CommentCard
          key={comment.pkCommentId}
          comment={comment}
          postId={postId}
          view="employee"
        />
      ))}
    </div>
  );
}
```

---

## 🔐 Permission Checks in Code

### Check if user is author
```typescript
const userData = useSelector((state: any) => state.user.userData);
const isAuthor = userData?.userId === post.authorId;
```

### Show edit button (employee only, author only)
```typescript
{isAuthor && view === 'employee' && (
  <button onClick={handleEdit}>Edit</button>
)}
```

### Show delete button (author in any view, or HR)
```typescript
{(view === 'hr' || isAuthor) && (
  <button onClick={handleDelete}>Delete</button>
)}
```

---

## 📝 TypeScript Type Examples

### Creating a post
```typescript
const postData: PostCreateDTO = {
  title: 'My Achievement',
  desc: 'I completed the project!',
  visibility: 'all',
  tagIds: [1, 2, 3],
  mainDocumentId: 5
};

// With file
const file = new File(['content'], 'certificate.pdf');
useCreatePost().mutate({ data: postData, file });
```

### Creating a comment
```typescript
const commentData: CommentCreateDTO = {
  desc: 'Great work!'
};

// Reply to comment
const replyData: CommentCreateDTO = {
  desc: 'Thanks!',
  parentCommentId: 10
};
```

### Filtering posts
```typescript
const filters: PostFilterDTO = {
  tagId: 1,
  authorId: 100,
  visibility: 'all',
  search: 'javascript',
  startDate: '2026-01-01T00:00:00',
  endDate: '2026-12-31T23:59:59'
};

const { data: filteredPosts } = useGetAllPosts(filters);
```

---

## 🎨 CSS Class Reference

### Layout Classes
```
.postDashboard        - Main container
.dashboardContainer   - 3-col grid layout
.filtersSidebar       - Left sidebar
.mainContent          - Center content
.commentsSidebar      - Right sidebar (desktop)
```

### Component Classes
```
.postCard             - Individual post
.commentCard          - Individual comment
.postListing          - Posts container
.postForm             - Create post form
.commentForm          - Comment form
```

### State Classes
```
.active               - Active tag filter
.liked                - Liked button state
.loading              - Loading state
.disabled             - Disabled state
```

---

## 🚀 Quick Start Commands

### Navigate to Achievement Feed
```typescript
// Using React Router
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Employee
navigate('/employee/achievement/posts');

// HR
navigate('/hr/achievement/posts');
```

### Fetch All Posts
```typescript
import { useGetAllPosts } from '@/Query/achievementQueries';

const { data: posts, isLoading } = useGetAllPosts();
```

### Create a Post
```typescript
import { useCreatePost } from '@/Query/achievementQueries';

const { mutate: createPost } = useCreatePost();

createPost({ 
  data: { 
    title: 'Title',
    desc: 'Description',
    visibility: 'all',
    tagIds: [1]
  },
  file: fileObject
});
```

### Like a Post
```typescript
import { useLikePost } from '@/Query/achievementQueries';

const { mutate: likePost } = useLikePost();

likePost(postId);
```

### Add a Comment
```typescript
import { useAddComment } from '@/Query/achievementQueries';

const { mutate: addComment } = useAddComment();

addComment({
  postId: 123,
  data: { desc: 'Comment text' }
});
```

### Reply to Comment
```typescript
import { useReplyComment } from '@/Query/achievementQueries';

const { mutate: replyComment } = useReplyComment();

replyComment({
  commentId: 456,
  data: { 
    desc: 'Reply text',
    parentCommentId: 456
  },
  postId: 123
});
```

---

## 🔧 Configuration Files

### Already Updated
```
src/Routes/Routes.tsx          ✅ Added achievement routes
src/Layouts/HRSidebar.tsx      ✅ Added "Achievements" link
src/Layouts/EmployeeSidebar.tsx ✅ Added "Achievements" link
```

### May Need Configuration
```
src/Api/achievementApi.ts
  - API_BASE = '/achievement'           (adjust if needed)

src/Styles/achievement.module.css
  - Color palette                       (can customize)
  - breakpoints                         (can adjust)
```

### Redux Store
```
Must have: state.user.userData.userId for permission checks
Already exists in your setup ✅
```

---

## ❌ What NOT to Do

❌ **Don't** pass wrong view prop
```typescript
// BAD
<PostDashboard view="invalid" />

// GOOD
<PostDashboard view="employee" />  // or "hr"
```

❌ **Don't** forget parentCommentId in replies
```typescript
// BAD
addComment({ desc: 'Reply' })  // Adds to post, not comment

// GOOD
replyComment({ data: { desc: 'Reply', parentCommentId: 123 }, ... })
```

❌ **Don't** mutate Redux user data
```typescript
// BAD
dispatch(setUserData({ ...userData, userId: 999 }))

// GOOD
// Use useSelector to read only
const userData = useSelector(s => s.user.userData)
```

❌ **Don't** query comments without postId
```typescript
// BAD
useGetComments(0)  // Still tries to fetch

// GOOD
const { data, isLoading } = useGetComments(postId || 0)
// With enabled check
const { data } = useGetComments(postId, { enabled: !!postId })
```

---

## ✅ What TO Do

✅ **Do** use React Query hooks
```typescript
// GOOD - Auto caching, refetching, invalidation
const { data, isLoading } = useGetAllPosts(filters);
```

✅ **Do** handle loading states
```typescript
// GOOD
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
```

✅ **Do** pass view prop consistently
```typescript
// GOOD - Same view prop everywhere
<PostDashboard view="employee" />
<PostCard post={post} view="employee" />
```

✅ **Do** use TypeScript types
```typescript
// GOOD - Type safe
const post: Post = fetchedPost;
const form: PostCreateDTO = formData;
```

---

## 📞 File Locations Reference

| What | Where |
|------|-------|
| Main Dashboard | `src/Pages/PostDashboard.tsx` |
| Post Display | `src/Components/PostCard.tsx` |
| Comment Display | `src/Components/CommentCard.tsx` |
| Post Form | `src/Components/CreatePostForm.tsx` |
| Comment Form | `src/Components/CreateCommentForm.tsx` |
| Post List | `src/Components/PostListing.tsx` |
| API Client | `src/Api/achievementApi.ts` |
| Queries | `src/Query/achievementQueries.ts` |
| Types | `src/Types/achievement.ts` |
| Styles | `src/Styles/achievement.module.css` |
| Routes | `src/Routes/Routes.tsx` |
| HR Sidebar | `src/Layouts/HRSidebar.tsx` |
| Employee Sidebar | `src/Layouts/EmployeeSidebar.tsx` |
| This Guide | `ACHIEVEMENT_SETUP_GUIDE.md` |
| Implementation Details | `ACHIEVEMENT_FRONTEND_IMPLEMENTATION.md` |
| Project Summary | `ACHIEVEMENT_SUMMARY.md` |

---

**Last Updated**: February 22, 2026
**Status**: ✅ Production Ready
**Quick Ref Version**: 1.0

