import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    useEffect( () => {
        const fetchPosts = async() => {
            const res = await axios.get('http://localhost:3000/posts');
            setPosts(res.data);
        }

        fetchPosts();
    }, []);

    return (
        <div className="postList">
          {posts.map(post => (
            <div key={post._id} className="postListItem2">
              <h2 className="postTitle"><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
              <p className="postBody">{post.body}</p>
            </div>
          ))}
        </div>
      );
}

export default PostList;