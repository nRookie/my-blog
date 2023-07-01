import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`)
      .then(res => {
        setPost(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

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
