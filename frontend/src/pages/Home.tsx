import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axiosConfig';
import { Post } from '../types/Post';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (error) {
        toast.error('Failed to fetch posts.');
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <div >
        <h2 className="title">Public Website - All Posts</h2>
      </div>
      <div className="grid-three padding">
        {posts.map((post) => (
          <div key={post.id} className="material-card">
            <div className="material-card-header">
              <h3>{post.title}</h3>
              <div>By: {post.user?.name || 'Unknown'}</div>
            </div>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
