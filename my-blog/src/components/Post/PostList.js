import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./PostList.css"
import serverAddress from '../../config.js';
import Button from '@material-ui/core/Button';

const PostList = () => {
   const navigate = useNavigate(); // initialize useNavigate
    const [posts, setPosts] = useState([]);
    useEffect( () => {
        const fetchPosts = async() => {
            const res = await axios.get(`${serverAddress}/posts`);
            setPosts(res.data);
        }

        fetchPosts();
    }, []);

    return (
        <div className="postList">
          {posts.map(post => (
            <div key={post._id} className="postListItem">
              <h2><Link className = "postTitleLink" to={`/post/${post._id}`}>{post.title}</Link></h2>
              <p className="postDescription">{post.description}</p>
            </div>
          ))}
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/create')} 
                style={{ marginBottom: '20px' }}
            >
                Create Post
            </Button>

        </div>
      );
}

export default PostList;