import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./CreatePost.css"

const CreatePost= () => {
    const [title, setTitle] = useState('');
    const [body, setbody] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newPost = {
            title,
            body
        };
        console.log("createPost: handle submit")

        await axios.post('http://localhost:3000/posts', newPost);

        navigate("/Post")
    };

    return (
        <div className="createPostContainer">
            <form className="createPostForm" onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                <label>Content:</label>
                <textarea value={body} onChange={(e) => setbody(e.target.value)} />

                <button type="submit" >Submit</button>
            </form>
        </div>
    )
}

export default CreatePost;
