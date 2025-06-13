import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BlogPostDetail from './BlogPostDetail';

const posts = [
  {
    id: '1',
    title: 'My First Blog Post',
    content: `<p>This is the full blog post. <a href="https://example.com">Example link</a></p>`,
    author: 'Karthik',
    date: '2023-01-01',
  },
];

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div style={{ padding: '2rem' }}>
            <h2>All Blog Posts</h2>
            {posts.map((post) => (
              <div key={post.id}>
                <h3>
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h3>
              </div>
            ))}
          </div>
        }
      />
      <Route
        path="/post/:id"
        element={<BlogPostWrapper posts={posts} />}
      />
    </Routes>
  );
}

function BlogPostWrapper({ posts }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);
  return post ? (
    <BlogPostDetail {...post} />
  ) : (
    <p style={{ padding: '2rem' }}>Blog post not found.</p>
  );
}

import { useParams } from 'react-router-dom';
export default App;
