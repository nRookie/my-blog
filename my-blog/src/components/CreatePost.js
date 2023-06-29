import React, {useState} from 'react';
import axios from 'axios';


const CreatePost= () => {
    const [title, setTitle] = useState('');
    const [body, setbody] = useState('');

    console.log("in create post")
    const handleSubmit = async(e) => {
        e.preventDefault();

        const newPost = {
            title,
            body
        };
        console.log("createPost: handle submit")

        await axios.post('http://localhost:3000/posts', newPost);

        setTitle('');
        setbody('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                <label>Body:</label>
                <textarea value={body} onChange={(e) => setbody(e.target.value)} />

                <button type="submit" >Submit</button>
            </form>
        </div>
    )
}

export default CreatePost;
