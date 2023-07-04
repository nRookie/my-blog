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
import VocabularyDayList from "./components/vocabulary/VocabularyDayList";
import VocabularyDay from "./components/vocabulary/VocabularyDay";
import EditVocabulary from "./components/vocabulary/EditVocabulary"

import './App.css';
import './Navbar.css'
import store from "./components/vocabulary/store";
import {Provider} from "react-redux";
import { ErrorBoundary } from 'react-error-boundary';
import CreateVocabularyDay from "./components/vocabulary/CreateVocabularyDay";  // You may need to install this package
import CreateVocabularyInDay from './components/vocabulary/CreateVocabulariesInDay';



function ErrorFallback({ error }) {
    return (
        <div>
            <h2>Something went wrong:</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
                {error.toString()}
            </details>
        </div>
    );
}



function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Provider store={store}>
        <Router>
            <div className="App">
                <Header/>
                <nav className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/post">Post List</Link>
                    <Link to="/create">Create Post</Link>
                    <Link to="/vocabulary">Vocabulary</Link>
                    <Link to="/create-vocabulary-list">Create Vocabulary Day</Link>
                    <Link to="/create-vocabulary-in-day">Create Vocabulary In Day</Link>
                </nav>

                <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/post" element={<PostList/>}/>
                        <Route path="/post/:id" element={<Post/>}/>
                        <Route path="/create" element={<CreatePost/>}/>
                        <Route path="/delete/:id" element={<DeletePost/>}/>
                        <Route path="/edit/:id" element={<EditPost/>}/>
                        <Route path="/vocabulary" element={<Vocabulary/>}>
                            <Route index element={<VocabularyDayList/>}/>
                            <Route path="day/:day" element={<VocabularyDay/>}/>
                        </Route>
                       <Route path="/create-vocabulary-list" element={<CreateVocabularyDay />}/>
                       <Route path="/create-vocabulary-in-day" element={<CreateVocabularyInDay />}/>
                       <Route path="edit/:day" element={<EditVocabulary />} />

                </Routes>
                <Footer/>
            </div>
        </Router>
        </Provider>
    </ErrorBoundary>
    );
}

export default App;
