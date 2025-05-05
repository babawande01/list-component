// src/App.js
import React from 'react';
import PostList from './components/PostList';

function App() {
  return (
    <div className="container py-5">
      <div className="card shadow p-4">
        <PostList />
      </div>
    </div>
  );
}

export default App;
