import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`)
      .then(res => {
        setPost(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);



  const deletePost = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/posts/${id}`);
        // After deleting, redirect to home page
        // You might need to use useHistory from react-router-dom for redirection
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <Link to={`/edit/${post._id}`}>Edit</Link>
      <Link to={`/delete/${post._id}`}>Delete</Link>
    </div>
  );
}

export default Post;
