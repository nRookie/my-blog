const express = require('express');
const vocabularyDayService = require('../services/vocabulary.day.service');
const router = express.Router();
const { authenticateRole } = require('../middleware/authMiddleware');  // Import the middleware

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

router.get('/:day', async (req,res) =>  {
  try {
    console.log("in get vocabulary day by day")
    const {day} = req.params;
    const vocabularyDay = await vocabularyDayService.getVocabularyDay(day)
    if (!vocabularyDay) {
      res.status(404).json({ error: 'vocabulary day not found' });
    }
    res.json(vocabularyDay)
  } catch {
    res.status(500).json({ message: 'An error occurred while deleting the vocabulary day', error });
  }
});



router.put('/:day', authenticateRole('admin'), async (req, res) => {
  try {
      console.log("in update")
      const updatedVocabularyDay = await vocabularyDayService.updateVocabularyDay(req.params.day, {
          vocabulary: req.body.vocabulary,
          vocabularyExplaination: req.body.vocabularyExplaination,
          description: req.body.description,
      })
      res.json(updatedVocabularyDay);
  } catch (err) {
      if (err.message == 'Vocabulary day not found') {
          res.status(404).json({ error: 'Vocabulary day not found' });
      } else {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
      }
  }
})

module.exports = router;