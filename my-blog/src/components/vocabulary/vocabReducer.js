// vocabReducer.js

const initialState = {
    vocabData: []
}

export default function vocabReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_VOCAB_DATA':
            return {
                ...state,
                vocabData: action.payload
            };
        default:
            return state;
    }
}
