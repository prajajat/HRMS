import React, { useState, useEffect } from "react";
import {
  useCreatePost,
  useUpdatePost,
  useGetAllTags,
  useCreateTag,
} from "../Query/useQueries";
import styles from "../Styles/achievement.module.css";

interface CreatePostFormProps {
  editingPost?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({
  editingPost,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<any>({
    title: "",
    desc: "",
    visibility: "all",
    tagIds: [],
    mainDocumentId: undefined,
  });
  const [file, setFile] = useState<File | undefined>();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [showTagForm, setShowTagForm] = useState(false);
  const [newTagName, setNewTagName] = useState("");

  const { mutate: createPost, isPending: isCreating } = useCreatePost();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();
  const { data: tags = [], isLoading: isLoadingTags } = useGetAllTags();
  const { mutate: createTag, isPending: isCreatingTag } = useCreateTag();

  useEffect(() => {
    if (editingPost) {
      setFormData({
        title: editingPost.title,
        desc: editingPost.desc,
        visibility: editingPost.visibility,
        tagIds: editingPost.tags?.map((t) => t.pkTagId) || [],
        mainDocumentId: editingPost.mainDocumentId,
      });
      setSelectedTags(editingPost.tags?.map((t) => t.pkTagId) || []);
    }
  }, [editingPost]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleTagSelect = (tagId: number) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((t) => t !== tagId);
      }
      return [...prev, tagId];
    });
  };

  const handleCreateTag = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTagName.trim()) {
      alert("Please enter a tag name");
      return;
    }

    createTag(
      { tagName: newTagName.trim() },
      {
        onSuccess: () => {
          setNewTagName("");
          setShowTagForm(false);
          console.log("Tag created successfully");
        },
        onError: (error) => {
          console.error("Error creating tag:", error);
          alert("Failed to create tag");
        },
      },
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData: any = {
      ...formData,
      tagIds: selectedTags,
    };

    if (editingPost) {
      updatePost(
        { postId: editingPost.pkPostId, data: submitData, file },
        {
          onSuccess: () => {
            resetForm();
            onSuccess?.();
          },
        },
      );
    } else {
      createPost(
        { data: submitData, file },
        {
          onSuccess: () => {
            resetForm();
            onSuccess?.();
          },
        },
      );
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      desc: "",
      visibility: "all",
      tagIds: [],
      mainDocumentId: undefined,
    });
    setFile(undefined);
    setSelectedTags([]);
  };

  const isLoading = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit} className={styles.postForm}>
      <h2>{editingPost ? "Edit Post" : "Create New Post"}</h2>

      {/* Title */}
      <div className={styles.formGroup}>
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter post title"
          required
          disabled={isLoading}
        />
      </div>

      {/* Description */}
      <div className={styles.formGroup}>
        <label htmlFor="desc">Description *</label>
        <textarea
          id="desc"
          name="desc"
          value={formData.desc}
          onChange={handleInputChange}
          placeholder="Describe your achievement"
          required
          disabled={isLoading}
          rows={5}
        />
      </div>

      {/* Visibility */}
      <div className={styles.formGroup}>
        <label htmlFor="visibility">Visibility *</label>
        <select
          id="visibility"
          name="visibility"
          value={formData.visibility}
          onChange={handleInputChange}
          disabled={isLoading}
        >
          <option value="all">All Employees</option>
          <option value="department">Department Only</option>
          <option value="manager">Manager Only</option>
          <option value="private">Private</option>
        </select>
      </div>

      {/* Tags */}
      <div className={styles.formGroup}>
        <div className={styles.tagHeader}>
          <label>Tags</label>
          <button
            type="button"
            onClick={() => setShowTagForm(!showTagForm)}
            className={styles.addTagBtn}
            disabled={isCreatingTag}
          >
            + Add New Tag
          </button>
        </div>

        {/* Create New Tag Form */}
        {showTagForm && (
          <div className={styles.createTagForm}>
            <input
              type="text"
              placeholder="Enter tag name"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              disabled={isCreatingTag}
              className={styles.tagInput}
            />
            <button
              type="button"
              onClick={handleCreateTag}
              disabled={isCreatingTag || !newTagName.trim()}
              className={styles.submitBtn}
            >
              {isCreatingTag ? "Creating..." : "Create Tag"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowTagForm(false);
                setNewTagName("");
              }}
              disabled={isCreatingTag}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        )}

        {/* Existing Tags List */}
        {tags && tags.length > 0 ? (
          <div className={styles.tagSelector}>
            {tags.map((tag: any) => (
              <label key={tag.pkTagId} className={styles.tagCheckbox}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.pkTagId)}
                  onChange={() => handleTagSelect(tag.pkTagId)}
                  disabled={isLoading || isCreatingTag}
                />
                <span>#{tag.tagName}</span>
              </label>
            ))}
          </div>
        ) : (
          <p className={styles.noTags}>
            No tags available. Create one to get started!
          </p>
        )}
      </div>

      {/* File Upload */}
      <div className={styles.formGroup}>
        <label htmlFor="file">Document/Image</label>
        <input
          id="file"
          type="file"
          onChange={handleFileChange}
          accept="image/*,.pdf,.doc,.docx"
          disabled={isLoading}
        />
        {file && <p className={styles.fileName}>Selected: {file.name}</p>}
      </div>

      {/* Buttons */}
      <div className={styles.formActions}>
        <button type="submit" disabled={isLoading} className={styles.submitBtn}>
          {isLoading
            ? "Saving..."
            : editingPost
              ? "Update Post"
              : "Create Post"}
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
