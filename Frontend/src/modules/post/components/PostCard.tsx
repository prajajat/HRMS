import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLikePost, useDeletePost, useUpdatePost } from "../queries/PostQueries";
import styles from "../../../Styles/achievement.module.css"; 

interface PostCardProps {
  post: any;
  view: "hr" | "employee";
  onCommentClick?: (postId: number) => void;
   
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  view,
  onCommentClick,
  onscroll,
}) => {
  const userId = useSelector((state: any) => state.user.userId);
  const { mutate: likePost, isPending: isLiking } = useLikePost();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editDesc, setEditDesc] = useState(post.description);

  // Ensure userId and authorId match (handle both string and number types)
  const currentUserId = Number(userId);
  const postAuthorId = Number(post?.authorId);

  const isAuthor =
    currentUserId > 0 && postAuthorId > 0 && currentUserId === postAuthorId;
  // Delete: HR users can always delete, or author can delete their own posts
  const canDelete = view === "hr" || isAuthor;
  // Edit: Only author can edit their own posts (only in employee view)
  const canEdit = isAuthor && view === "employee";
  const canShowMenu = canEdit || canDelete;

  // Debug logging
  useEffect(() => {
    console.log("PostCard Debug:", {
      currentUserId,
      postAuthorId,
      isAuthor,
      userId,
      "post.authorId": post?.authorId,
      view,
      canDelete,
      canEdit,
      canShowMenu,
      "post.pkPostId": post?.pkPostId,
    });
  }, [
    view,
    canDelete,
    canEdit,
    isAuthor,
    currentUserId,
    postAuthorId,
    post?.pkPostId,
  ]);

  const handleLike = () => {
    likePost(post.pkPostId);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(post.pkPostId);
      setShowOptions(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowOptions(false);
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim() || !editDesc.trim()) {
      alert("Title and description cannot be empty");
      return;
    }

    updatePost(
      {
        postId: post.pkPostId,
        data: {
          title: editTitle,
          desc: editDesc,
          visibility: post.visibility,
          tagIds: post.tags?.map((t: any) => t.pkTagId) || [],
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: (error) => {
          console.error("Error updating post:", error);
          alert("Failed to update post");
        },
      },
    );
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(post.title);
    setEditDesc(post.description);
  };

  return (
    <div className={styles.postCard} onScrollEndCapture={onscroll}>
      {/* Header */}
      <div className={styles.postHeader}>
        <div className={styles.authorInfo}>
          <div className="flex flex-row">
            <img
              src={post.authorImageUrl?post.authorImageUrl: "/letter-r.png"}
              className="h-10 w-10"
            ></img>
            <h3>{post.authorName || "System"}</h3>
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
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.postContent}>
        {isEditing ? (
          <div className={styles.editFormInline}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className={styles.editInput}
              placeholder="Post title"
              disabled={isUpdating}
            />
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className={styles.editInput}
              placeholder="Post description"
              rows={4}
              disabled={isUpdating}
            />
            <div className={styles.editButtonsGroup}>
              <button
                onClick={handleSaveEdit}
                disabled={isUpdating}
                className={styles.saveBtnInline}
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isUpdating}
                className={styles.cancelBtnInline}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </>
        )}
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
          className={`${styles.actionBtn} ${post.likedByCurrentUser ? styles.liked : ""}`}
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
