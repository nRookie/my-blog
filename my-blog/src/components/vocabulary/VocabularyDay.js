import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
import {VocabularyContext} from "./Context";

const VocabularyDay = () => {
    const { day } = useParams();
    const { vocabData} = useContext(VocabularyContext);

    const vocab = vocabData.find(vocab => vocab.day === Number(day))

    return (
        <div>
            <h2>Day {day}</h2>
            <ul>
                {vocab && vocab.vocab.map((word, index) => <li key={index}> {word}</li>)}
            </ul>
        </div>
    )
}

export default VocabularyDay;
