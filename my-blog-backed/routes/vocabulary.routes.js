const express = require('express');
const vocabularyService = require('../services/vocabulary.service');
const router = express.Router();
const { authenticateRole } = require('../middleware/authMiddleware');  // Import the middleware

router.get('/id/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const vocabulary = await vocabularyService.getVocabularyById(id);
        if (!vocabulary) {
            return res.status(404).json({ error: 'Vocabulary not found' });
        }
        res.json(vocabulary);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/day/:day', async (req, res) => {
    try {
        const vocabularies = await vocabularyService.getVocabulariesByDay(req.params.day)
        if (!vocabularies) {
            return res.status(404).json({ error: 'vocabularies not found' });
        }
        res.json(vocabularies);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', authenticateRole('admin'), async (req, res) => {
    try {
        const savedVocabulary = await vocabularyService.createVocabulary({
            day: req.body.day,
            vocabulary: req.body.vocabulary,
            hiragana : req.body.hiragana,
            vocabularyExplaination: req.body.vocabularyExplaination
        })
        res.status(200).json(savedVocabulary);
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message });
    }
});

router.delete('/id/:id', authenticateRole('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        await vocabularyService.deleteVocabulary(id)
        res.status(200).json({ message: 'Vocabulary deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the post', error });
    }
});


router.put('/id/:id', authenticateRole('admin'), async (req, res) => {
    try {
        const updatedVocabulary = await vocabularyService.updateVocabulary(req.params.id, {
            vocabulary: req.body.vocabulary,
            vocabularyExplaination: req.body.vocabularyExplaination,
            description: req.body.description,
        })
        res.json(updatedVocabulary);
    } catch (err) {
        if (err.message == 'Vocabulary not found') {
            res.status(404).json({ error: 'Vocabulary not found' });
        }
        res.status(500).json({ error: 'Server error' })
    }
})



// Similarly, refactor other routes with the corresponding service methods...

module.exports = router;
