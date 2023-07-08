const VocabularyDay = require('../models/VocabularyDay');


exports.getVocabularyDays = async() => {
    const vocabList = await VocabularyDay.find();
    return vocabList
}

exports.createVocabularyDay = async(vocabularyDayData) => {
    const newVocabularyDay = new VocabularyDay(vocabularyDayData);
    return await newVocabularyDay.save();
}

exports.deleteVocabularyDay = async(day) => {
   return await VocabularyDay.findOneAndDelete({
    day : day
   })
}