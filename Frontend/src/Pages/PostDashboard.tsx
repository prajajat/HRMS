import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '../Styles/achievement.module.css';
import { useGetAllPosts, useGetAllTags, useGetComments } from '../Query/useQueries';
import { CreatePostForm } from '../Components/CreatePostForm';
import { PostListing } from '../Components/PostListing';
import { CreateCommentForm } from '../Components/CreateCommentForm';
import { CommentCard } from '../Components/CommentCard';
 

interface PostDashboardProps {
  view: 'hr' | 'employee';
}

export const PostDashboard: React.FC<PostDashboardProps> = ({ view }) => {
  const userData = useSelector((state: any) => state.user.userData);
  const [filters, setFilters] = useState<any>({});
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [replyingToComment, setReplyingToComment] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState<string>('');
  const [authorFilter, setAuthorFilter] = useState<string>('');

  const { data: posts = [], isLoading: postsLoading } = useGetAllPosts(filters);
  const { data: comments = [], isLoading: commentsLoading } = useGetComments(
    selectedPostId || 0
  );
  const { data: tags = [] } = useGetAllTags();

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setFilters(prev => ({
      ...prev,
      search: value || undefined
    }));
  };

  const handleVisibilityChange = (value: string) => {
    setVisibilityFilter(value);
    setFilters(prev => ({
      ...prev,
      visibility: value || undefined
    }));
  };

  const handleTagFilter = (tagId: number) => {
    setFilters(prev => ({
      ...prev,
      tagId: prev.tagId === tagId ? undefined : tagId
    }));
  };

  const handleAuthorFilter = (value: string) => {
    setAuthorFilter(value);
    if (value === 'myPosts') {
      // Filter to show only user's own posts
      setFilters(prev => ({
        ...prev,
        authorId: userData?.userId
      }));
    } else if (value === 'all') {
      // Show all posts
      setFilters(prev => {
        const { authorId, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleEditPost = (post: any) => {
    setEditingPost(post);
    setShowCreateForm(true);
    setSelectedPostId(null);
  };

  const handleCloseEditForm = () => {
    setEditingPost(null);
    setShowCreateForm(false);
  };

  const handlePostSuccess = () => {
    handleCloseEditForm();
  };

  const handleCommentClick = (postId: number) => {
    setSelectedPostId(selectedPostId === postId ? null : postId);
  };

  const selectedPost = posts.find(p => p.pkPostId === selectedPostId);

  useEffect(() => {
    // Reset selected post when posts change
    if (selectedPostId && !posts.find(p => p.pkPostId === selectedPostId)) {
      setSelectedPostId(null);
    }
    // Debug logging
    console.log('PostDashboard - selectedPostId:', selectedPostId, 'posts:', posts.length, 'comments:', comments.length);
  }, [posts, selectedPostId, comments]);

  return (
    <div className={styles.postDashboard}>
      <div className={styles.dashboardContainer}>
        {/* Main Content with Filters at Top */}
        <main className={styles.mainContent}>
          {/* Top Filters Bar */}
          <div className={styles.filtersBar}>
            {/* Search */}
            <div className={styles.filterGroup}>
              <label htmlFor="search">Search</label>
              <input
                id="search"
                type="text"
                placeholder="Search posts..."
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                className={styles.filterInput}
              />
            </div>

            {/* Visibility Filter */}
            <div className={styles.filterGroup}>
              <label htmlFor="visibility">Visibility</label>
              <select
                id="visibility"
                value={visibilityFilter}
                onChange={(e) => handleVisibilityChange(e.target.value)}
                className={styles.filterInput}
              >
                <option value="">All</option>
                <option value="all">All Employees</option>
                <option value="department">Department</option>
                <option value="manager">Manager</option>
                <option value="private">Private</option>
              </select>
            </div>

            {/* Author Filter */}
            <div className={styles.filterGroup}>
              <label htmlFor="author">Author</label>
              <select
                id="author"
                value={authorFilter}
                onChange={(e) => handleAuthorFilter(e.target.value)}
                className={styles.filterInput}
              >
                <option value="all">All Authors</option>
                <option value="myPosts">My Posts</option>
              </select>
            </div>

            {/* Tags Filter */}
            <div className={styles.filterGroup}>
              <label>Tags</label>
              <div className={styles.tagFilterList}>
                {tags.map((tag: any) => (
                  <button
                    key={tag.pkTagId}
                    className={`${styles.tagFilterBtn} ${
                      filters.tagId === tag.pkTagId ? styles.active : ''
                    }`}
                    onClick={() => handleTagFilter(tag.pkTagId)}
                  >
                    #{tag.tagName}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(searchText || visibilityFilter || filters.tagId || authorFilter !== '') && (
              <button
                onClick={() => {
                  setSearchText('');
                  setVisibilityFilter('');
                  setAuthorFilter('');
                  setFilters({});
                }}
                className={styles.clearFiltersBtn}
              >
                Clear Filters
              </button>
            )}
          </div>
          {/* Create Post Button/Form */}
          {!showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className={styles.createPostBtn}
            >
              + Create Post
            </button>
          )}

          {showCreateForm && (
            <div className={styles.formWrapper}>
              <CreatePostForm
                editingPost={editingPost || undefined}
                onSuccess={handlePostSuccess}
                onCancel={handleCloseEditForm}
              />
            </div>
          )}

          {/* Posts Listing */}
          <div className={styles.postsSection}>
            <PostListing
              posts={posts}
              isLoading={postsLoading}
              view={view}
              onEdit={handleEditPost}
              onCommentClick={handleCommentClick}
            />
          </div>
        </main>

        {/* Right Sidebar - Comments */}
        {selectedPost && (
          <aside className={styles.commentsSidebar}>
            <div className={styles.commentsHeader}>
              <h3>Comments</h3>
              <button
                onClick={() => setSelectedPostId(null)}
                className={styles.closeBtn}
              >
                ✕
              </button>
            </div>

            {/* Post Preview */}
            <div className={styles.postPreview}>
              <h4>{selectedPost.title}</h4>
              <p className={styles.postPreviewAuthor}>by {selectedPost.authorName}</p>
            </div>

            {/* Add Comment Form */}
            <div className={styles.addCommentSection}>
              {!replyingToComment && !editingCommentId && (
                <CreateCommentForm
                  postId={selectedPostId}
                  onSuccess={() => {
                    // Comments will auto-refresh via useGetComments
                  }}
                />
              )}
            </div>

            {/* Comments List */}
            <div className={styles.commentsList}>
              {commentsLoading ? (
                <p>Loading comments...</p>
              ) : comments.length === 0 ? (
                <p className={styles.noComments}>No comments yet</p>
              ) : (
                comments.map((comment: any) => (
                  <div key={comment.pkCommentId} className={styles.commentItemWrapper}>
                    <CommentCard
                      comment={comment}
                      postId={selectedPostId}
                      view={view}
                      onReply={(commentId) => setReplyingToComment(commentId)}
                      onEdit={(comment) => {
                        setEditingCommentId(comment.pkCommentId);
                      }}
                    />

                    {/* Reply Form */}
                    {replyingToComment === comment.pkCommentId && (
                      <div className={styles.replyFormWrapper}>
                        <CreateCommentForm
                          postId={selectedPostId}
                          parentCommentId={comment.pkCommentId}
                          onSuccess={() => setReplyingToComment(null)}
                          onCancel={() => setReplyingToComment(null)}
                        />
                      </div>
                    )}

                    {/* Edit Form */}
                    {editingCommentId === comment.pkCommentId && (
                      <div className={styles.editFormWrapper}>
                        <CreateCommentForm
                          postId={selectedPostId}
                          editingCommentId={comment.pkCommentId}
                          editingCommentText={comment.desc}
                          onSuccess={() => setEditingCommentId(null)}
                          onCancel={() => setEditingCommentId(null)}
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
