import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Post = ( {match }) => {
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get('http://localhost:3000/posts/${match.params.id');
            setPost(res.data);
        }

        fetchPost();
    }, [match.params.id])

    return (
        <div> 
            <h2> {post.title} </h2>
            <p> {post.body}</p>
        </div>
    );
};

export default Post;
