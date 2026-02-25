import React from "react";
import { PostCard } from "./PostCard";
import styles from "../Styles/achievement.module.css";

interface PostListingProps {
  posts: any[];
  isLoading: boolean;
  view: "hr" | "employee";
  onCommentClick?: (postId: number) => void;
 
}

export const PostListing: React.FC<PostListingProps> = ({
  posts,
  isLoading,
  view,
  onCommentClick,
  onscroll
}) => {
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No posts found. Be the first to share an achievement!</p>
      </div>
    );
  }

  return (
    <div className={styles.postListing} onScrollEndCapture={onscroll}>
      {posts.map((post) => (
        <PostCard
          key={post.pkPostId}
          post={post}
          view={view}
          onCommentClick={onCommentClick}
           
        />
      ))}
    </div>
  );
};
