# Achievement Feed - Frontend Setup & Implementation Guide

## ✅ Files Created

### 1. API Layer (`src/Api/`)
- **achievementApi.ts** - Axios client with 14 endpoints
  - Post CRUD operations
  - Comment CRUD operations  
  - Like operations
  - Tag operations

### 2. Query Layer (`src/Query/`)
- **achievementQueries.ts** - React Query hooks
  - 10 query hooks (GET operations)
  - 9 mutation hooks (POST/PUT/DELETE operations)
  - Auto-invalidation on mutations

### 3. Types (`src/Types/`)
- **achievement.ts** - TypeScript interfaces
  - Post, PostCreateDTO, PostUpdateDTO, PostFilterDTO
  - Comment, CommentCreateDTO, CommentUpdateDTO
  - Tag, TagCreateDTO
  - ApiResponse wrapper

### 4. Components (`src/Components/`)
- **PostCard.tsx** (188 lines)
  - Individual post display
  - Author info with timestamp
  - Like/Comment buttons
  - Visibility badge
  - Tags display
  - Edit/Delete options menu (conditional)
  
- **CommentCard.tsx** (116 lines)
  - Comment display with nested support
  - Recursive reply rendering
  - Like/Reply/Edit/Delete buttons
  - Collapsible replies section
  - Author info and timestamps
  
- **PostListing.tsx** (53 lines)
  - Map posts to PostCards
  - Loading state
  - Empty state
  - Responsive layout
  
- **CreatePostForm.tsx** (205 lines)
  - Create/Edit mode support
  - Title, description textarea
  - Visibility dropdown
  - Multi-select tags
  - File upload with preview
  - Form validation
  - Loading states
  
- **CreateCommentForm.tsx** (109 lines)
  - Add comment to post
  - Reply to comment (nested)
  - Edit comment support
  - Form validation
  - Loading states

### 5. Pages (`src/Pages/`)
- **PostDashboard.tsx** (365 lines)
  - Main layout with 3 sections
  - **Left Sidebar - Filters**:
    - Search input
    - Visibility filter dropdown
    - Tag filter chips (toggleable)
    - Clear filters button
    
  - **Main Content**:
    - Create post button
    - Create post form (toggleable)
    - Posts listing with applied filters
    
  - **Right Sidebar** (on desktop):
    - Selected post preview
    - Comments list
    - Add comment form
    - Nested reply/edit forms

### 6. Routes (`src/Routes/`)
- **Routes.tsx** - Updated with Achievement routes
  - HR: `/hr/achievement/posts` → PostDashboard view="hr"
  - Employee: `/employee/achievement/posts` → PostDashboard view="employee"

### 7. Styling (`src/Styles/`)
- **achievement.module.css** (650+ lines)
  - 3-column grid layout (desktop)
  - Responsive single-column (mobile/tablet)
  - Complete component styling
  - Hover/focus/active states
  - Dark mode ready variables

### 8. Navigation Updates
- **HRSidebar.tsx** - Added "Achievements" link
- **EmployeeSidebar.tsx** - Added "Achievements" link

### 9. Documentation
- **ACHIEVEMENT_FRONTEND_IMPLEMENTATION.md** - Complete reference

---

## 🔐 Permission System

### Edit Post
```typescript
isAuthor = userData?.userId === post.authorId
canEdit = isAuthor && view === 'employee'
```
✅ Only post author can edit (employee view)

### Delete Post
```typescript
const canDelete = view === 'hr' || (isAuthor && view === 'employee');
```
✅ HR can delete any post (moderation)
✅ Author can delete own post (employee view)

### Edit Comment
```typescript
isAuthor = userData?.userId === comment.authorId
canEdit = isAuthor && view === 'employee'
```
✅ Only comment author can edit

### Delete Comment
```typescript
const canDelete = view === 'hr' || (isAuthor && view === 'employee');
```
✅ HR can delete any comment
✅ Author can delete own comment

---

## 📱 User Flows

### Employee View (`view="employee"`)
```
1. Browse Achievement Feed
   ├─ Search by title/description
   ├─ Filter by visibility level
   └─ Filter by tag (click to toggle)

2. Create Post
   ├─ Fill title, description
   ├─ Set visibility (all/department/manager/private)
   ├─ Select tags
   ├─ Upload document/image
   └─ Submit

3. Interact with Posts
   ├─ Like/Unlike post
   ├─ Add comment
   ├─ Reply to comment (nested)
   ├─ Edit own post/comment
   └─ Delete own post/comment

4. View Comments
   ├─ Expand nested replies
   ├─ Read all comments
   └─ Interact with comments
```

### HR View (`view="hr"`)
```
1. Browse Achievement Feed
   ├─ See all posts (all visibility levels)
   ├─ Search and filter (same as employee)
   └─ Identify inappropriate content

2. Moderation Actions
   ├─ Delete any post
   ├─ Delete any comment
   └─ Leave notifications to users

3. Monitoring
   ├─ View all comments/replies
   ├─ Track engagement (likes/comments)
   └─ Ensure community guidelines
```

---

## 🔄 Data Flow

### Post Creation Flow
```
CreatePostForm
  ↓ (submit)
useCreatePost mutation
  ↓
achievementApi.createPost(FormData)
  ↓ (POST /achievement/post/create)
Backend creates post + document
  ↓ (success)
Mutation auto-invalidates posts cache
  ↓
useGetAllPosts hook refetches
  ↓
PostDashboard updates with new post
```

### Comment Creation Flow
```
CreateCommentForm
  ↓ (submit)
useAddComment or useReplyComment mutation
  ↓
achievementApi.addComment() or .replyComment()
  ↓ (POST endpoints)
Backend creates comment
  ↓ (success)
Mutation auto-invalidates comments cache
  ↓
useGetComments hook refetches
  ↓
CommentCard tree updates with new comment
```

### Like Flow
```
PostCard/CommentCard
  ↓ (click like)
useLikePost/useLikeComment mutation
  ↓
achievementApi.likePost() or .likeComment()
  ↓ (POST endpoints)
Backend toggles like
  ↓ (success)
Mutation auto-invalidates cache
  ↓
Hook refetches and UI updates
```

---

## 🎨 Styling Approach

### Color Scheme
| Element | Color | Hex |
|---------|-------|-----|
| Primary | Blue | #007bff |
| Success | Green | #28a745 |
| Danger | Red | #dc3545 |
| Warning | Yellow | #ffc107 |
| Background | Light Gray | #f5f5f5 |
| Card | White | #ffffff |
| Border | Gray | #e0e0e0 |
| Text | Dark | #333333 |
| Muted Text | Gray | #999999 |

### Layout
- **Desktop (1200px+)**: 3-column grid (filters | content | comments)
- **Tablet (768-1200px)**: 1-column layout (fixed sidebar hidden)
- **Mobile (<768px)**: 1-column layout (forms stacked)

### Components Styling
- **Cards**: White background, subtle shadow, hover effects
- **Forms**: Consistent input styling, focus states
- **Buttons**: Color-coded (blue=primary, red=danger, green=success)
- **Tags**: Light blue background with blue text
- **Comments**: Light gray background with blue left border

---

## 🚀 Integration Steps

### Step 1: Verify Backend
- ✅ All 14 endpoints operational
- ✅ CORS configured
- ✅ Authentication working
- ✅ API base URL correct

### Step 2: Install Dependencies (if needed)
```bash
npm install @tanstack/react-query axios react-redux react-router-dom
```

### Step 3: Update Redux Store
Ensure Redux store has user data:
```typescript
// Already should have:
state.user.userData.userId
state.user.userData.userName
```

### Step 4: Test Routes
```
Employee: http://localhost:5173/employee/achievement/posts
HR: http://localhost:5173/hr/achievement/posts
```

### Step 5: Test Functionality
- Create post with file upload
- Add comments and replies
- Like posts/comments
- Test filters
- Test edit/delete (permission checks)
- Test HR moderation

---

## 📊 Component Props Reference

### PostDashboard
```typescript
interface PostDashboardProps {
  view: 'hr' | 'employee';
}
```

### PostCard
```typescript
interface PostCardProps {
  post: Post;
  view: 'hr' | 'employee';
  onEdit?: (post: Post) => void;
  onCommentClick?: (postId: number) => void;
}
```

### CommentCard
```typescript
interface CommentCardProps {
  comment: Comment;
  postId: number;
  view: 'hr' | 'employee';
  onReply?: (commentId: number) => void;
  onEdit?: (comment: Comment) => void;
}
```

### CreatePostForm
```typescript
interface CreatePostFormProps {
  editingPost?: Post;
  onSuccess?: () => void;
  onCancel?: () => void;
}
```

### CreateCommentForm
```typescript
interface CreateCommentFormProps {
  postId: number;
  parentCommentId?: number;
  editingCommentId?: number;
  editingCommentText?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}
```

---

## 🧪 Testing Checklist

### Functionality Tests
- [ ] Create post visible in feed
- [ ] Edit post updates content
- [ ] Delete post removes from feed
- [ ] Like/unlike toggles state
- [ ] Add comment displays
- [ ] Reply to comment nests correctly
- [ ] Edit comment updates text
- [ ] Delete comment removes it
- [ ] Filter by tag works
- [ ] Search by text works
- [ ] Visibility filter works

### Permission Tests
- [ ] Employee can edit own posts
- [ ] Employee cannot edit others' posts
- [ ] Employee cannot see delete button for others' posts
- [ ] HR can delete any post
- [ ] HR can delete any comment
- [ ] Same tests for comments

### UI/UX Tests
- [ ] Loading states appear
- [ ] Error messages display
- [ ] Form validation works
- [ ] Responsive layout on mobile
- [ ] Nested replies display correctly
- [ ] Comments sidebar updates
- [ ] Options menu appears correctly

### Performance Tests
- [ ] Query caching prevents repeated requests
- [ ] Mutations invalidate correct cache keys
- [ ] Large comment threads render smoothly
- [ ] File upload works (progress and completion)

---

## 🐛 Common Issues & Solutions

### Issue: Comments not loading
**Solution**: Ensure `selectedPostId` is set before requesting comments. Check React Query DevTools for cache state.

### Issue: Permissions not working
**Solution**: Verify `userData?.userId` from Redux matches backend user ID. Check view prop is passed correctly.

### Issue: File upload fails
**Solution**: Ensure FormData is structured correctly. Check browser Network tab for actual API request.

### Issue: Filters not working
**Solution**: Verify filter parameters match backend endpoint query parameter names. Check React Query DevTools for filter values in query key.

### Issue: CORS errors
**Solution**: Update API base URL to match backend host. Ensure backend CORS settings allow frontend origin.

---

## 📝 Code Examples

### Using PostDashboard
```tsx
import { PostDashboard } from './Pages/PostDashboard';

// Employee route
<PostDashboard view="employee" />

// HR route
<PostDashboard view="hr" />
```

### Using Individual Components
```tsx
import { PostCard } from './Components/PostCard';
import { CreatePostForm } from './Components/CreatePostForm';

// Custom integration
<CreatePostForm onSuccess={() => refetch()} />
<PostCard post={post} view="employee" />
```

### Using Queries
```tsx
import { useGetAllPosts, useCreatePost } from './Query/achievementQueries';

function MyComponent() {
  const { data: posts } = useGetAllPosts({ visibility: 'all' });
  const { mutate: createPost } = useCreatePost();
  
  return (
    <div>
      {posts?.map(post => <PostCard key={post.pkPostId} post={post} view="employee" />)}
    </div>
  );
}
```

---

## 📦 Deployment Checklist

- [ ] All TypeScript types correct
- [ ] No console errors in build
- [ ] API endpoints responding
- [ ] Permissions working correctly
- [ ] File uploads successful
- [ ] Query caching working
- [ ] Responsive design tested
- [ ] Performance acceptable
- [ ] Error handling covers edge cases
- [ ] User feedback clear (loading, success, error states)

---

## 🎓 Key Concepts

### React Query
- Automatic caching by query key
- Mutations auto-invalidate related queries
- Stale time prevents unnecessary refetches
- Background refetching keeps data fresh

### TypeScript
- Type safety for all API responses
- Interfaces match backend DTOs
- Props validation via component interfaces

### React Hooks
- `useState` for form state and UI state
- `useEffect` for side effects (initialize editing)
- Custom hooks for API operations

### Responsive Design
- CSS Grid for layout
- Media queries for breakpoints
- Flexible components

---

**Status**: ✅ Ready for Development
**Total Files**: 15 created/updated
**Lines of Code**: 1500+
**Components**: 5
**Pages**: 1
**Hooks**: 19 (10 queries + 9 mutations)

