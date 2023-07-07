
const mongoose = require('mongoose');


// Define the schema for a post
const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    date: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Post', postSchema);