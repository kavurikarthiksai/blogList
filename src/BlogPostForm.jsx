import React, { useState, useEffect, useRef } from 'react';
import styles from './BlogPostForm.module.css';

const BlogPostForm = ({ post, onSubmit, onDelete }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dialogRef = useRef(null);
  const deleteButtonRef = useRef(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setContent(post.content || '');
      setAuthor(post.author || '');
      setDate(post.date || '');
    }
  }, [post]);

  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current?.focus();
    }
  }, [isDialogOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!content) newErrors.content = 'Content is required';
    if (!author) newErrors.author = 'Author is required';
    if (!date) newErrors.date = 'Date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    onSubmit({ title, content, author, date });
  };

  const confirmDelete = () => {
    setIsDeleting(true);
    onDelete?.();
    setIsDialogOpen(false);
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    deleteButtonRef.current?.focus();
  };

  return (
    <form className={styles.blogPostForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title && <span className={styles.error}>{errors.title}</span>}
      </div>
      <div className={styles.formGroup}>
        <label>Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        {errors.content && <span className={styles.error}>{errors.content}</span>}
      </div>
      <div className={styles.formGroup}>
        <label>Author</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        {errors.author && <span className={styles.error}>{errors.author}</span>}
      </div>
      <div className={styles.formGroup}>
        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        {errors.date && <span className={styles.error}>{errors.date}</span>}
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>

        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => setIsDialogOpen(true)}
          ref={deleteButtonRef}
        >
          Delete
        </button>
      </div>

      {isDialogOpen && (
        <div className={styles.overlay} onClick={cancelDelete}>
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            tabIndex="-1"
            ref={dialogRef}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Escape') cancelDelete();
            }}
          >
            <h2 id="dialog-title">Confirm Deletion</h2>
            <p id="dialog-description">Are you sure you want to delete this post?</p>
            <div className={styles.dialogButtons}>
              <button onClick={cancelDelete}>Cancel</button>
              <button onClick={confirmDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default BlogPostForm;
