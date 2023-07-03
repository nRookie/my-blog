const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Schema = mongoose.Schema
// Define the schema for a post
const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    date: {type: Date, default: Date.now}
});

const vocabularySchema = new mongoose.Schema({
    day: Schema.Number,
    vocabulary: String,
    vocabularyExplaination: String,
    date: {type: Date, default: Date.now}
});

const vocabularyDaySchema = new mongoose.Schema({
    day: Schema.Number,
    description: String,
    date: {type: Date, default: Date.now}
})
// Create a model from that schema
const Post = mongoose.model('Post', postSchema);

const Vocabulary = mongoose.model('vocabulary', vocabularySchema);

const VocabularyDay = mongoose.model('vocabularyDay', vocabularyDaySchema)
const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json());

app.use(cors());


// Connect to MongoDB (replace "your_database_url" with your actual MongoDB URL)
mongoose.connect('mongodb://localhost:27017/my-blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Define your API endpoint
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


app.post('/posts', async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
    });

    try {

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.delete('/posts/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Post.findByIdAndDelete(id);
        res.status(200).json({message: 'Post deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'An error occurred while deleting the post', error});
    }
});


app.get('/posts/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({message: 'Post not found'});
        }

        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
});


app.put('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({error: 'Post not found'});
        }
        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        post.description = req.body.description || post.description;
        const updatedPost = await post.save();

        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({error: 'Server error'});
    }
});


/** maybe should need to get the day Id from the path*/
app.get('/vocabulary', async (req, res) => {
    const vocabList = await Vocabulary.find();
    res.json(vocabList);
});


app.get('/vocabulary_day', async (req, res) => {
    const vocabList = await VocabularyDay.find();
    res.json(vocabList);
});

app.post('/vocabulary_day', async (req, res) => {
    const vocab = new Vocabulary({
        day: req.body.day,
        description: req.body.description
    });
    const savedVocab = await vocab.save();
    res.json(savedVocab);
});

app.post('/vocabulary', async (req, res) => {
    const vocab = new Vocabulary({
        day: req.body.day,
        vocabulary: req.body.vocabulary,
        vocabularyExplaination: req.body.vocabularyExplaination,
    });
    const savedVocab = await vocab.save();
    res.json(savedVocab);
});



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
