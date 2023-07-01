import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./EditPost.css"

function EditPost() {
    const [title, setTitle] = useState('')
    const [content,setContent] = useState('')
    const [description, setDescription] = useState('')
    const {id} = useParams();
    const navigate = useNavigate();


    useEffect( () =>  {
        axios.get(`http://localhost:3000/posts/${id}`)
        .then(res => {
            setTitle(res.data.title);
            setContent(res.data.content);
            setDescription(res.data.description)
        })
        .catch(err => console.error(err));
    }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/posts/${id}`, {title, content, description})
        .then(() => navigate('/Post'))
        .catch(err => console.error(err))
    }

    return (
        <div className="editPostContainer">
            <form onSubmit={handleSubmit} className="editPostForm">
                <label className="editPostLabel">Title:</label>
                <input className="editPostInput" type="text" value={title} onChange= {e => setTitle(e.target.value)} />
                <label className="editPostLabel">Description:</label>
                <input className="editPostInput" type="text" value={description} onChange= {e => setDescription(e.target.value)} />
                <label className="editPostLabel">Content:</label>
                <textarea className='editPostTextarea' value={content} onChange={e => setContent(e.target.value)} />
                <button className="editPostButton" type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditPost;
