const mongoose = require('mongoose');

const vocabularySchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true,
    },
    vocabulary: String,
    hiragana: String,
    vocabularyExplaination: String,
    date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('vocabulary',vocabularySchema)