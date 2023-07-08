const Vocabulary = require('../models/Vocabulary');

exports.getVocabularyById = async (id) => {
  return await Vocabulary.findById(id);
};

exports.updateVocabulary = async (id, updateData) => {
  const vocabulary = await Vocabulary.findById(id);
  if (!vocabulary) {
    throw new Error('Vocabulary not found');
  }

  vocabulary.vocabulary = updateData.vocabulary || vocabulary.vocabulary;
  vocabulary.vocabularyExplaination = updateData.vocabularyExplaination || vocabulary.vocabularyExplaination;

  return await vocabulary.save();
};

// More methods for other vocabulary operations...
