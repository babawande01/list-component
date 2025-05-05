// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import ListComponent from './ListComponent';

const POSTS_PER_PAGE = 5;

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
      })
      .then((data) => {
        const trimmed = data.slice(0, 20); // Use first 20 posts
        setPosts(trimmed);
        setFilteredPosts(trimmed);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter posts
  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to page 1 when filtering
  }, [searchTerm, posts]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  if (loading) return <div className="alert alert-info text-center">Loading posts...</div>;
  if (error) return <div className="alert alert-danger text-center">Error: {error}</div>;

  return (
    <div>
      <h1 className="mb-4 text-center">Post List</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* List */}
      <ListComponent
        items={paginatedPosts}
        renderItem={(post) => (
          <div>
            <h5 className="fw-bold">{post.title}</h5>
            <p>{post.body}</p>
          </div>
        )}
      />

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-muted">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;
