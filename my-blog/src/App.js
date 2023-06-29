import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import Post from './components/Post';
import CreatePost from './components/CreatePost';

import './App.css';

function App() {
  console.log("app.js")
  return (
   <Router>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<PostList/>} />
        <Route path="/post/:id" element={<Post/>} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
      <Footer />
    </div>
   </Router>
  );
}

export default App;
