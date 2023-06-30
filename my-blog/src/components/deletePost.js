import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DeletePost() {
  const { id } = useParams();
  const [isDeleting, setIsDeleting] = React.useState(false);
  
  const deletePost = () => {
    setIsDeleting(true);

    console.log("set to true")
    axios.delete(`http://localhost:3000/posts/${id}`)
      .then(response => {
        console.log(response.data);
        setIsDeleting(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setIsDeleting(false);
      });
  };

  return (
    <div>
      <p>Are you sure you want to delete this post?</p>
      <button onClick={deletePost} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}

export default DeletePost;
