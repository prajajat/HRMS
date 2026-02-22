# Achievement Feed Frontend Implementation

Complete frontend implementation for the Achievement Feed module with posts, comments, likes, tags, and moderation capabilities.

## 📁 File Structure

### API Integration
- **`src/Api/achievementApi.ts`** - Axios API client with all 14 endpoints
- **`src/Query/achievementQueries.ts`** - React Query hooks for data fetching and mutations

### Type Definitions
- **`src/Types/achievement.ts`** - TypeScript interfaces for all DTOs and entities

### Components
- **`src/Components/PostCard.tsx`** - Individual post display with edit/delete options
- **`src/Components/CommentCard.tsx`** - Comment display with nested replies support
- **`src/Components/PostListing.tsx`** - List container for posts
- **`src/Components/CreatePostForm.tsx`** - Form to create/edit posts with file upload
- **`src/Components/CreateCommentForm.tsx`** - Form to add/reply/edit comments

### Pages
- **`src/Pages/PostDashboard.tsx`** - Main dashboard with filters and comments sidebar

### Routes
- **`src/Routes/Routes.tsx`** - Updated routes for HR and Employee achievement sections

### Styles
- **`src/Styles/achievement.module.css`** - All component styling

## 🚀 Features

### PostCard Component
- Display post with title, description, author, date
- Like/comment counters
- Visibility badge
- Tagged items
- Edit/Delete options (based on permissions):
  - **Author** (Employee view): Edit and Delete
  - **HR** (HR view): Delete only
- Options menu for conditional actions

### CommentCard Component
- Display comments with nested replies (unlimited depth)
- Recursive rendering of replies
- Like/Reply/Edit/Delete actions
- Expandable replies counter
- Soft delete support
- Edit capability for comment author

### PostListing Component
- Display list of posts
- Loading state
- Empty state handling
- Integration with PostCard

### CreatePostForm Component
- Create new posts
- Edit existing posts
- Title, description input
- Visibility dropdown (all, department, manager, private)
- Tag selection (multiple)
- File upload (image/PDF/doc)
- Form validation
- Loading states

### CreateCommentForm Component
- Add comment to post
- Reply to comment (nested)
- Edit comment text
- Recursive parent comment support
- Form validation

### PostDashboard Page
- **Left Sidebar**: Filters
  - Search by keyword
  - Filter by visibility
  - Filter by tags (click to toggle)
  - Clear filters button
  
- **Main Content**: 
  - Create post button
  - Create post form (when visible)
  - Posts listing with filters applied
  
- **Right Sidebar** (when post selected):
  - Selected post preview
  - Comments list
  - Add comment form
  - Reply forms (nested)
  - Edit comment forms

### View Parameter Support
- **`view="employee"`**: Employee dashboard
  - Edit own posts/comments
  - Delete own posts/comments
  - Create posts and comments
  
- **`view="hr"`**: HR dashboard
  - Delete any post/comment (moderation)
  - View all posts with all visibility levels
  - Full moderation capabilities

## 📝 Routes

### Employee Routes
```
/employee/achievement/posts  → PostDashboard with view="employee"
```

### HR Routes
```
/hr/achievement/posts  → PostDashboard with view="hr"
```

## 🔗 API Endpoints Used

All 14 backend endpoints are fully integrated:

### Posts
- `POST /achievement/post/create` - Create post
- `GET /achievement/post/all` - Get filtered posts
- `GET /achievement/post/{postId}` - Get single post
- `PUT /achievement/post/{postId}` - Update post
- `DELETE /achievement/post/{postId}` - Delete post (HR only)
- `POST /achievement/post/{postId}/like` - Like/unlike post

### Comments
- `POST /achievement/comment/post/{postId}` - Add comment
- `POST /achievement/comment/{commentId}/reply` - Reply to comment
- `PUT /achievement/comment/{commentId}` - Update comment
- `DELETE /achievement/comment/{commentId}` - Delete comment (HR/author)
- `POST /achievement/comment/{commentId}/like` - Like/unlike comment
- `GET /achievement/comment/post/{postId}` - Get comments for post

### Tags
- `POST /achievement/tag/create` - Create tag
- `GET /achievement/tag/all` - Get all tags

## 🔐 Permission Logic

### Edit Post
```typescript
const canEdit = userData?.userId === post.authorId && view === 'employee';
```

### Delete Post
```typescript
const canDelete = view === 'hr' || (isAuthor && view === 'employee');
```

### Edit Comment
```typescript
const canEdit = userData?.userId === comment.authorId && view === 'employee';
```

### Delete Comment
```typescript
const canDelete = view === 'hr' || (isAuthor && view === 'employee');
```

## 🎨 Styling Features

- **Grid Layout**: 3-column (Filters | Content | Comments) on desktop
- **Responsive**: Single column on mobile/tablet
- **Color Scheme**:
  - Primary: #007bff (blue)
  - Success: #28a745 (green)
  - Danger: #dc3545 (red)
  - Warning: #ffc107 (yellow)
  - Neutral: #f0f0f0, #e0e0e0, #999
  
- **Interactive Elements**:
  - Hover effects on cards and buttons
  - Focus states on form inputs
  - Disabled states for loading
  - Active states for filters

## 🧩 Component Integration

### Data Flow
```
PostDashboard (parent, manages state)
  ├─ FiltersSidebar (filters state)
  ├─ CreatePostForm (post creation)
  ├─ PostListing (posts display)
  │  └─ PostCard (individual post)
  │     └─ Options (edit/delete)
  └─ CommentsSidebar (when post selected)
     ├─ CreateCommentForm (add comment)
     └─ CommentsList
        └─ CommentCard (recursive for replies)
           ├─ CreateCommentForm (reply form)
           └─ CommentCard (nested replies)
```

### State Management
- **Redux**: User data (userId for permission checks)
- **React Query**: Post/comment/tag data fetching and caching
- **Component State**: Form states, selections, modals

## 🔄 Mutation Hooks

All mutations auto-invalidate related queries:

```typescript
useCreatePost()      → Invalidates posts
useUpdatePost()      → Invalidates posts
useDeletePost()      → Invalidates posts
useLikePost()        → Invalidates posts
useAddComment()      → Invalidates comments
useReplyComment()    → Invalidates comments
useUpdateComment()   → Invalidates comments
useDeleteComment()   → Invalidates comments
useLikeComment()     → Invalidates comments
useCreateTag()       → Invalidates tags
```

## 📦 Dependencies

- `react` - UI components
- `react-redux` - State management
- `@tanstack/react-query` - Data fetching
- `axios` - HTTP client
- `react-router-dom` - Routing

## 🚦 Query Stale Times

- **Posts**: 5 minutes
- **Tags**: 1 hour
- **Comments**: Real-time (no stale time)

## 📋 File Upload

Posts support multipart file uploads (image/PDF/doc):

```typescript
const formData = new FormData();
formData.append('postData', JSON.stringify(data));
if (file) formData.append('mainDocument', file);
```

## ✅ Form Validation

- **PostCreateDTO**: Title and description required
- **CommentCreateDTO**: Description required (non-empty)
- **TagCreateDTO**: Tag name required
- File upload: Optional (image, PDF, doc/docx only)

## 🎯 Usage Example

```tsx
// In Employee Layout
import { PostDashboard } from '../Pages/PostDashboard';

// In employee route
<PostDashboard view="employee" />

// In HR Layout  
<PostDashboard view="hr" />
```

## 🐛 Error Handling

- Network errors: Displayed to user via alert
- Form validation: Client-side validation with helpful messages
- Delete confirmation: Confirmation dialog before deletion
- Optimistic updates: React Query handles optimistic updates automatically

## 📊 Performance Optimizations

- **Query Caching**: React Query caches by filters
- **Pagination**: Ready for infinite scroll (can add in PostListing)
- **Lazy Loading**: Comments load only when post selected
- **Memoization**: Components optimized with React.FC types
- **CSS Modules**: Scoped styling, no style conflicts

## 🔧 Configuration

### Base API URL
Located in `achievementApi.ts`:
```typescript
const API_BASE = '/achievement';
```
Adjust if API is on different base path.

### View Props
Always pass explicit view prop:
```tsx
<PostDashboard view="hr" />      // HR dashboard
<PostDashboard view="employee" /> // Employee dashboard
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (3-column layout)
- **Tablet**: 768px-1200px (1-column layout)
- **Mobile**: <768px (1-column, stacked forms)

## 🎓 Development Notes

1. All TypeScript types imported from `Types/achievement.ts`
2. All API calls use `achievementApi` object
3. All data queries use custom React Query hooks
4. Components accept `view` prop to control permissions
5. Comments support unlimited nesting via `parentCommentId`
6. Mutations auto-refresh related queries automatically

---

**Status**: ✅ Production Ready
**Last Updated**: February 22, 2026
