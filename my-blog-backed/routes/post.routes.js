const express = require('express');
const postService = require('../services/post.service');
const router = express.Router();


// Define your API endpoint
router.get('/', async (req, res) => {
    try {
        const posts = await postService.getPosts()
        res.status(200).json(posts);
    } catch (err) {
        console.error(err)
        res.status(500).json({message: err.message});
    }
});


router.post('/', async (req, res) => {
    try {
        const savedPost = await  postService.createPost({
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
        })
        res.status(200).json(savedPost);
    } catch (err) {
        console.error(err)
        res.status(500).json({message: err.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await postService.deletePost(id)
        res.status(200).json({message: 'Post deleted successfully'});
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'An error occurred while deleting the post', error});
    }
});


router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const post = await postService.getPostById(id)
        if (!post) {
            return res.status(404).json({message: 'Post not found'});
        }
        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await postService.updatePost(req.params.id, {
            title: req.body.title,
            content: req.body.content,
            description :req.body.description,
        })

        res.json(updatedPost);
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Server error'});
    }
});





module.exports = router;