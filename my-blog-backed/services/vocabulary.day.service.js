const VocabularyDay = require('../models/VocabularyDay');


exports.getVocabularyDays = async() => {
    const vocabDayList = await VocabularyDay.find();
    return vocabDayList
}

exports.getVocabularyDay = async(day) => {
    const vocabularyDay = await VocabularyDay.findOne({
        day : day
    })
    return vocabularyDay
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

exports.updateVocabularyDay = async (day, updateData) => {
    const vocabularyDay = await VocabularyDay.findOneAndUpdate(
        {day : day}, updateData, 
            {new: true}
    );
    return vocabularyDay
};