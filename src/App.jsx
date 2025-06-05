import React from 'react';
import BlogPostList from './BlogPostList';

const samplePosts = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    summary: 'Intro to useState and useEffect.',
    date: '2025-05-01',
  },
  {
    id: 2,
    title: 'CSS Grid vs Flexbox',
    summary: 'How to choose between CSS Grid and Flexbox.',
    date: '2025-05-03',
  },
  {
    id: 3,
    title: 'JavaScript ES6 Features',
    summary: 'Modern JavaScript features you should know.',
    date: '2025-05-05',
  },
];

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Blog Posts</h1>
      <BlogPostList posts={samplePosts} />
    </div>
  );
}

export default App;
