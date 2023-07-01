import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/Post/PostList';
import Post from './components/Post/Post';
import CreatePost from './components/Post/CreatePost';
import {Link} from 'react-router-dom';
import DeletePost from './components/Post/DeletePost';
import EditPost from './components/Post/EditPost';
import HomePage from './components/HomePage';
import Vocabulary from "./components/vocabulary/Vocabulary";
import VocabularyList from "./components/vocabulary/VocabularyList";
import VocabularyDay from "./components/vocabulary/VocabularyDay";

import './App.css';
import './Navbar.css'
import store from "./components/vocabulary/store";
import {Provider} from "react-redux";


function App() {
    return (
        <Provider store={store}>
        <Router>
            <div className="App">
                <Header/>
                <nav className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/post">Post List</Link>
                    <Link to="/create">Create Post</Link>
                    <Link to="/vocabulary">Vocabulary</Link>
                </nav>

                <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/post" element={<PostList/>}/>
                        <Route path="/post/:id" element={<Post/>}/>
                        <Route path="/create" element={<CreatePost/>}/>
                        <Route path="/delete/:id" element={<DeletePost/>}/>
                        <Route path="/edit/:id" element={<EditPost/>}/>
                        <Route path="/vocabulary" element={<Vocabulary/>}>
                            <Route index element={<VocabularyList/>}/>
                            <Route path="day/:day" element={<VocabularyDay/>}/>
                        </Route>
                </Routes>
                <Footer/>
            </div>
        </Router>
        </Provider>
    );
}

export default App;
