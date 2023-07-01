import React, {createContext, useState} from 'react';

export const VocabularyContext = createContext();

export const VocabularyProvider = ({ children}) => {
    const [vocabData, setVocabData] = useState([
        { day: 1, vocab: ['word1', 'word2', 'word3'] },
        { day: 2, vocab: ['word4', 'word5', 'word6'] },
        ]);

    return (
        <VocabularyContext.Provider value={{ vocabData, setVocabData }}>
            {children}
        </VocabularyContext.Provider>
    );
}