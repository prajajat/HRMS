import React, { useState, useEffect } from 'react';
 
import { useSelector } from 'react-redux';
import styles from '../Styles/achievement.module.css';
import { useDeleteComment, useLikeComment } from '../Query/useQueries';

interface CommentCardProps {
  comment: any;
  postId: number;
  view: 'hr' | 'employee';
  onReply?: (commentId: number) => void;
  onEdit?: (comment: any) => void;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  postId,
  view,
  onReply,
  onEdit
}) => {
  const userData = useSelector((state: any) => state.user.userData);
  const { mutate: likeComment, isPending: isLiking } = useLikeComment();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();
  const [showOptions, setShowOptions] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  // Ensure userId and authorId match (handle both string and number types)
  const currentUserId = Number(userData?.userId);
  const commentAuthorId = Number(comment?.authorId);

  const isAuthor = currentUserId > 0 && currentUserId === commentAuthorId;
  // Delete: HR users can always delete, or author can delete their own comments
  const canDelete = view === 'hr' || isAuthor;
  // Edit: Only author can edit their own comments (only in employee view)
  const canEdit = isAuthor && view === 'employee';
  const hasReplies = comment.replies && comment.replies.length > 0;

  // Debug logging
  useEffect(() => {
    if (currentUserId > 0 && commentAuthorId > 0) {
      console.log('CommentCard Debug:', {
        currentUserId,
        commentAuthorId,
        isAuthor,
        userData: userData?.userId,
        authorId: comment?.authorId,
        view,
        canDelete,
        canEdit
      });
    }
  }, [isAuthor, currentUserId, commentAuthorId, view]);

  const handleLike = () => {
    likeComment(comment.pkCommentId);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment({ commentId: comment.pkCommentId, postId });
      setShowOptions(false);
    }
  };

  return (
    <div className={styles.commentCard} style={{ marginLeft: comment.parentCommentId ? '30px' : '0' }}>
      {/* Header */}
      <div className={styles.commentHeader}>
        <div className={styles.authorInfo}>
          <h4>{comment.authorName}</h4>
          <p className={styles.timestamp}>
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Options Menu */}
        {(canEdit || canDelete) && (
          <div className={styles.optionsMenu}>
            <button
              className={styles.menuButton}
              onClick={() => setShowOptions(!showOptions)}
            >
              ⋮
            </button>
            {showOptions && (
              <div className={styles.dropdownMenu}>
                {canEdit && (
                  <button onClick={() => onEdit?.(comment)} className={styles.menuItem}>
                    Edit
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className={styles.menuItem}
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <p className={styles.commentContent}>{comment.description || comment.desc}</p>

      {/* Actions */}
      <div className={styles.commentActions}>
        <button
          className={`${styles.actionBtn} ${comment.likedByCurrentUser ? styles.liked : ''}`}
          onClick={handleLike}
          disabled={isLiking}
        >
          ❤️ {comment.likesCount}
        </button>
        <button
          className={styles.actionBtn}
          onClick={() => onReply?.(comment.pkCommentId)}
        >
          ↩️ Reply
        </button>
        {hasReplies && (
          <button
            className={styles.actionBtn}
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? '▼' : '▶'} {comment.replies.length} replies
          </button>
        )}
      </div>

      {/* Nested Replies */}
      {hasReplies && showReplies && (
        <div className={styles.repliesContainer}>
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.pkCommentId}
              comment={reply}
              postId={postId}
              view={view}
              onReply={onReply}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};
