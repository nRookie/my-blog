import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import { Link } from 'react-router-dom';

import './App.css';
import DeletePost from './components/DeletePost';
import EditPost from './components/EditPost';

function App() {
  console.log("app.js")
  return (
   <Router>
    <div className="App">
      <Header />
      <nav>
          <Link to="/">Home</Link> | 
          <Link to="/">Post List</Link> | 
          <Link to="/create">Create Post</Link> |
          <Link to="/deletepost">DeletePost</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PostList/>} />
        <Route path="/post/:id" element={<Post/>} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/delete/:id" element={<DeletePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
      <Footer />
    </div>
   </Router>
  );
}

export default App;
