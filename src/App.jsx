import React, { useState } from 'react';
import BlogPostForm from './BlogPostForm';

function App() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const handleSubmit = (formData) => {
    if (editingPost) {
      // Edit existing post
      const updatedPosts = posts.map((p, index) =>
        index === editingPost.index ? formData : p
      );
      setPosts(updatedPosts);
      setEditingPost(null);
    } else {
      // Add new post
      setPosts([...posts, formData]);
    }
  };

  const handleEdit = (index) => {
    setEditingPost({ ...posts[index], index });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{editingPost ? 'Edit Post' : 'Create New Post'}</h1>
      <BlogPostForm post={editingPost} onSubmit={handleSubmit} />

      <h2>All Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        <ul>
          {posts.map((post, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <h3>{post.title}</h3>
              <p><strong>Author:</strong> {post.author}</p>
              <p><strong>Date:</strong> {post.date}</p>
              <button onClick={() => handleEdit(index)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
