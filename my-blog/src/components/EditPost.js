import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Navigate } from 'react-router-dom';


function EditPost() {
    const [title, setTitle] = useState('')
    const [content,setContent] = useState('')
    const {id} = useParams();
    const navigate = useNavigate();


    useEffect( () =>  {
        axios.get(`http://localhost:3000/posts/${id}`)
        .then(res => {
            setTitle(res.data.title);
            setContent(res.data.content);
        })
        .catch(err => console.error(err));
    }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/posts/${id}`, {title, content})
        .then(() => navigate('/'))
        .catch(err => console.error(err))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange= {e => setTitle(e.target.value)} />
            <textarea value={content} onChange={e => setContent(e.target.value)} />
            <button type="submit">Save</button>
        </form>
    );
}

export default EditPost;
