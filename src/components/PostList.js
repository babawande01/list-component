// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import ListComponent from './ListComponent';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
      })
      .then((data) => {
        setPosts(data.slice(0, 10));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="alert alert-info text-center">Loading posts...</div>;
  if (error) return <div className="alert alert-danger text-center">Error: {error}</div>;

  return (
    <div>
      <h1 className="mb-4 text-center">Post List</h1>
      <ListComponent
        items={posts}
        renderItem={(post) => (
          <div>
            <h5 className="fw-bold">{post.title}</h5>
            <p>{post.body}</p>
          </div>
        )}
      />
    </div>
  );
};

export default PostList;
