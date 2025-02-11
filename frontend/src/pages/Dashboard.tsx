import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axiosConfig';
import { Post } from '../types/Post';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchPosts();
    }
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (err) {
      toast.error('Failed to fetch posts.');
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditingPostId(null);
  };

  const createPost = async () => {
    try {
      if (!title.trim() || !content.trim()) {
        toast.error('Title and Content are required.');
        return;
      }
      await api.post('/posts', { title, content });
      toast.success('Post created successfully!');
      resetForm();
      fetchPosts();
    } catch (err) {
      toast.error('Failed to create post.');
    }
  };

  const startEdit = (post: Post) => {
    setEditingPostId(post.id || null);
    setTitle(post.title);
    setContent(post.content);
  };

  const updatePost = async () => {
    if (!editingPostId) return;
    if (!title.trim() || !content.trim()) {
      toast.error('Title and Content are required.');
      return;
    }
    try {
      await api.put(`/posts/${editingPostId}`, { title, content });
      toast.success('Post updated successfully!');
      resetForm();
      fetchPosts();
    } catch (err) {
      toast.error('Failed to update the post.');
    }
  };

  const deletePost = async (id: number | undefined) => {
    if (!id) return;
    try {
      await api.delete(`/posts/${id}`);
      toast.success('Post deleted successfully!');
      resetForm();
      fetchPosts();
    } catch (err) {
      toast.error('Failed to delete the post.');
    }
  };

  return (
    <div className="dashboard">
      {/* Post form */}
      <div className="post-form material-card">
        <h3>{editingPostId ? 'Edit Post' : 'Create a New Post'}</h3>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
            id="title"
            type="text"
            placeholder="Enter post title" 
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Enter post content"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>

        {editingPostId ? (
          <button className="btn primary" onClick={updatePost}>Update Post</button>
        ) : (
          <button className="btn primary" onClick={createPost}>Create Post</button>
        )}
      </div>

      <hr />
      <h2>Posts List</h2>
      <div className="grid-three">
        {posts.map((post) => (
          <div key={post.id} className="material-card">
            <div className="material-card-header">
              <h4>{post.title}</h4>
              <div>By: {post.user?.name || 'Anonymous'}</div>
            </div>
            <p>{post.content}</p>
            <div className="btn-group">
              <button className="btn edit-btn" onClick={() => startEdit(post)}>Edit</button>
              <button className="btn delete-btn" onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
