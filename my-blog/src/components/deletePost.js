import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./DeletePost.css"

// this is not used anymore, but I want to use the Deleting button method in post delete method
function DeletePost() {
  const { id } = useParams();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const navigate = useNavigate()
  
  const deletePost = () => {
    setIsDeleting(true);

    axios.delete(`http://localhost:3000/posts/${id}`)
      .then(response => {
        setIsDeleting(false);
        navigate('/post')
      })
      .catch(error => {
        console.error('There was an error!', error);
        setIsDeleting(false);
      });
  };

  return (
    <div className="deletePost">
      <p className="confirmation">Are you sure you want to delete this post?</p>
      <button className="deleteButton" onClick={deletePost} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}

export default DeletePost;
