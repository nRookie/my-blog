import React, { useState, useEffect} from 'react';
import axios from 'axios';

const PostList = () => {
    console.log("helloPostList")
    const [posts, setPosts] = useState([]);

    useEffect( () => {
        const fetchPosts = async() => {
            const res = await axios.get('http://localhost:3000/posts');
            setPosts(res.data);
        }

        fetchPosts();
    }, []);

    return (
        <div> 
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}

export default PostList;