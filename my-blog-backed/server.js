const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Define the schema for a post
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
});

// Create a model from that schema
const Post = mongoose.model('Post', postSchema);

const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json());

app.use(cors());


// Connect to MongoDB (replace "your_database_url" with your actual MongoDB URL)
mongoose.connect('mongodb://localhost:27017/my-blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Define your API endpoint
app.get('/posts', async (req, res) => {
    try {
        console.log("get received")
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.post('/posts', async (req, res) => {
    console.log("post received")
    console.log(req)
    const newPost = new Post({
        title: req.body.title,
        content: req.body.body,
    });

    try {
        
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
