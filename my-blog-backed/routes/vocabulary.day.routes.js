const express = require('express');
const vocabularyDayService = require('../services/vocabulary.day.service');
const router = express.Router();


router.get('/', async (req, res) => {
    const vocabList = await vocabularyDayService.getVocabularyDays()
    res.json(vocabList);
});


router.post('/', async (req, res) => {
    try {
      console.log("in create vocabulary day")
      const savedVocabDay = vocabularyDayService.createVocabularyDay({
        day: req.body.day,
        description: req.body.description
      })
      res.json(savedVocabDay);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.day) {
        // If the error is due to a duplicate key (day), handle it appropriately
        res.status(400).json({ error: 'Duplicate day value. Please choose a different day.' });
      } else {
        // Handle other errors
        res.status(500).json({ error: 'An error occurred while saving the vocabulary.' });
      }
    }
});

module.exports = router;