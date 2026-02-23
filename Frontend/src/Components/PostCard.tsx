import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLikePost, useDeletePost } from '../Query/useQueries';
import styles from '../Styles/achievement.module.css';

interface PostCardProps {
  post: any;
  view: 'hr' | 'employee';
  onEdit?: (post: any) => void;
  onCommentClick?: (postId: number) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  view,
  onEdit,
  onCommentClick
}) => {
  const userData = useSelector((state: any) => state.user.userData);
  const { mutate: likePost, isPending: isLiking } = useLikePost();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const [showOptions, setShowOptions] = useState(false);

  // Ensure userId and authorId match (handle both string and number types)
  const currentUserId = Number(userData?.userId);
  const postAuthorId = Number(post?.authorId);
  
  const isAuthor = currentUserId > 0 && currentUserId === postAuthorId;
  // Delete: HR users can always delete, or author can delete their own posts
  const canDelete = view === 'hr' || isAuthor;
  // Edit: Only author can edit their own posts (only in employee view)
  const canEdit = isAuthor && view === 'employee';
  const canShowMenu = canEdit || canDelete;

  // Debug logging
  useEffect(() => {
    console.log('PostCard Debug:', {
      currentUserId,
      postAuthorId,
      isAuthor,
      userData: userData?.userId,
      authorId: post?.authorId,
      view,
      canDelete,
      canEdit,
      canShowMenu
    });
  }, [view, canDelete, canEdit, isAuthor, currentUserId, postAuthorId]);

  const handleLike = () => {
    likePost(post.pkPostId);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.pkPostId);
      setShowOptions(false);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(post);
    }
    setShowOptions(false);
  };

  return (
    <div className={styles.postCard}>
      {/* Header */}
      <div className={styles.postHeader}>
        <div className={styles.authorInfo}>
           <div className='flex flex-row'>
           <img src={post.authorImageUrl||'/letter-r.png'} className="h-10 w-10"></img>
          <h3>{post.authorName || 'System'}</h3>
          </div>
          <p className={styles.timestamp}>
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        {/* Options Menu */}
        {canShowMenu && (
          <div className={styles.optionsMenu}>
            <button
              className={styles.menuButton}
              onClick={() => setShowOptions(!showOptions)}
              title="Post options"
            >
              ⋮
            </button>
            {showOptions && (
              <div className={styles.dropdownMenu}>
                {canEdit && (
                  <button onClick={handleEdit} className={styles.menuItem}>
                    Edit
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className={styles.menuItem}
                    title="Delete post"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.postContent}>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
      </div>

      {/* Image/Document Display */}
      {post.mainDocumentUrl && (
        <div className={styles.postMediaContainer}>
          {post.mainDocumentUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
            <img
              src={post.mainDocumentUrl}
              alt={post.title}
              className={styles.postImage}
              loading="lazy"
            />
          ) : (
            <div className={styles.documentPreview}>
              <a
                href={post.mainDocumentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.documentLink}
              >
                📎 View Document
              </a>
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className={styles.tagsList}>
          {post.tags.map((tag) => (
            <span key={tag.pkTagId} className={styles.tag}>
              #{tag.tagName}
            </span>
          ))}
        </div>
      )}

      {/* Visibility Badge */}
      <div className={styles.visibility}>
        <span className={styles.badge}>{post.visibility}</span>
      </div>

      {/* Actions */}
      <div className={styles.postActions}>
        <button
          className={`${styles.actionBtn} ${post.likedByCurrentUser ? styles.liked : ''}`}
          onClick={handleLike}
          disabled={isLiking}
        >
          ❤️ {post.likesCount}
        </button>
        <button
          className={styles.actionBtn}
          onClick={() => onCommentClick?.(post.pkPostId)}
        >
          💬 {post.commentsCount}
        </button>
      </div>
    </div>
  );
};
