import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./CreatePost.css"

const CreatePost= () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newPost = {
            title,
            description,
            content,
        };

        await axios.post('http://localhost:3000/posts', newPost);

        navigate("/Post")
    };

    return (
        <div className="createPostContainer">
            <form className="createPostForm" onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                <label>description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

                <label>Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />

                <button type="submit" >Submit</button>
            </form>
        </div>
    )
}

export default CreatePost;
