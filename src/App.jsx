import React, { useState } from 'react';
import BlogPostForm from './BlogPostForm';

function App() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const handleSubmit = (formData) => {
    if (editingPost) {
      const updatedPosts = posts.map((p, index) =>
        index === editingPost.index ? formData : p
      );
      setPosts(updatedPosts);
      setEditingPost(null);
    } else {
      setPosts([...posts, formData]);
    }
  };

  const handleDelete = (indexToDelete) => {
    if (indexToDelete === undefined) return; // nothing to delete
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      setPosts(posts.filter((_, index) => index !== indexToDelete));
      if (editingPost?.index === indexToDelete) {
        setEditingPost(null);
      }
    }
  };

  const handleEdit = (index) => {
    setEditingPost({ ...posts[index], index });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{editingPost ? 'Edit Post' : 'Create New Post'}</h1>
      <BlogPostForm
        post={editingPost}
        onSubmit={handleSubmit}
        onDelete={() => handleDelete(editingPost?.index)}
      />
      <hr />
      <h2>All Posts</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <strong>{post.title}</strong> by {post.author}{' '}
            <button onClick={() => handleEdit(index)}>Edit</button>{' '}
            <button onClick={() => handleDelete(index)} style={{ color: 'red' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
