import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import "./Post.css"
import serverAddress from '../config.js';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`${serverAddress}/posts/${id}`)
      .then(res => {
        setPost(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  return (
    <div className="post-container">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.content}</p>
      <Link className="post-action-link" to={`/edit/${post._id}`}>Edit</Link>
      <Link className="post-action-link" to={`/delete/${post._id}`}>Delete</Link>
    </div>
  );
}

export default Post;
