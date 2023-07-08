const express = require('express');
const vocabularyDayService = require('../services/vocabulary.day.service');
const router = express.Router();


router.get('/', async (req, res) => {
    const vocabList = await vocabularyDayService.getVocabularyDays()
    res.json(vocabList);
});


router.post('/', authenticateRole('admin'), async (req, res) => {
    try {
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

router.delete('/:day', authenticateRole('admin'), async (req,res) =>  {
  try {
    const {day} = req.params;

    await vocabularyDayService.deleteVocabularyDay(day)
    res.status(200).json({ message: 'Vocabulary day deleted successfully' });
  } catch {
    res.status(500).json({ message: 'An error occurred while deleting the vocabulary day', error });
  }
});

module.exports = router;