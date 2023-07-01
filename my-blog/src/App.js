import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/Post/PostList';
import Post from './components/Post/Post';
import CreatePost from './components/Post/CreatePost';
import { Link } from 'react-router-dom';
import DeletePost from './components/Post/DeletePost';
import EditPost from './components/Post/EditPost';
import HomePage from './components/HomePage';

import './App.css';
import './Navbar.css'


function App() {
  console.log("app.js")
  return (
   <Router>
    <div className="App">
      <Header />
      <nav className="navbar">
          <Link to="/">Home</Link> 
          <Link to="/post">Post List</Link>
          <Link to="/create">Create Post</Link> 
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post" element={<PostList/>} />
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
