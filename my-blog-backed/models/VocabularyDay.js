
const mongoose = require('mongoose');


const vocabularyDaySchema = new mongoose.Schema({
    day: {
        type: Number,
        unique: true,
        required: true,
        index: true // Add this line
    },
    description: String,
    date: {type: Date, default: Date.now}
})


module.exports = mongoose.model('vocabularyDay', vocabularyDaySchema)