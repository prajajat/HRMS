import React, { useState, useEffect } from 'react';
import { useAddComment, useReplyComment, useUpdateComment } from '../../../Query/useQueries';
import styles from "../../../Styles/achievement.module.css";

interface CreateCommentFormProps {
  postId: number;
  parentCommentId?: number;
  editingCommentId?: number;
  editingCommentText?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const CreateCommentForm: React.FC<CreateCommentFormProps> = ({
  postId,
  parentCommentId,
  editingCommentId,
  editingCommentText,
  onSuccess,
  onCancel
}) => {
  const [desc, setDesc] = useState('');
  const { mutate: addComment, isPending: isAdding } = useAddComment();
  const { mutate: replyComment, isPending: isReplying } = useReplyComment();
  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment();
  console.log(postId,parentCommentId,editingCommentId,editingCommentText);
  useEffect(() => {
    if (editingCommentText) {
      setDesc(editingCommentText);
    }
  }, [editingCommentText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!desc.trim()) {
      alert('Please enter a comment');
      return;
    }

    try {
      if (editingCommentId) {
        console.log('Updating comment:', { commentId: editingCommentId, desc, postId });
        updateComment(
          { commentId: editingCommentId, desc, postId },
          {
            onSuccess: () => {
              console.log('Comment updated successfully');
              setDesc('');
              onSuccess?.();
            },
            onError: (error) => {
              console.error('Error updating comment:', error);
              alert('Failed to update comment');
            }
          }
        );
      } else if (parentCommentId) {
        console.log('Posting reply:', { commentId: parentCommentId, desc, postId });
        replyComment(
          {
            commentId: parentCommentId,
            data: { desc, parentCommentId },
            postId
          },
          {
            onSuccess: () => {
              console.log('Reply posted successfully'+parentCommentId);
              setDesc('');
              onSuccess?.();
            },
            onError: (error) => {
              console.error('Error posting reply:', error);
              alert('Failed to post reply');
            }
          }
        );
      } else {
        console.log('Adding comment:', { postId, desc });
        addComment(
          { postId, data: { desc } },
          {
            onSuccess: () => {
              console.log('Comment added successfully');
              setDesc('');
              onSuccess?.();
            },
            onError: (error) => {
              console.error('Error adding comment:', error);
              alert('Failed to post comment. Please try again.');
            }
          }
        );
      }
    } catch (error) {
      console.error('Error in comment submission:', error);
      alert('An error occurred while posting your comment');
    }
  };

  const isLoading = isAdding || isReplying || isUpdating;

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <div className={styles.formGroup}>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder={
            parentCommentId
              ? 'Write a reply...'
              : editingCommentId
              ? 'Edit your comment...'
              : 'Write a comment...'
          }
          disabled={isLoading}
          rows={3}
        />
      </div>

      <div className={styles.formActions}>
        <button
          type="submit"
          disabled={isLoading || !desc.trim()}
          className={styles.submitBtn}
        >
          {isLoading
            ? 'Posting...'
            : editingCommentId
            ? 'Update Comment'
            : parentCommentId
            ? 'Post Reply'
            : 'Post Comment'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
