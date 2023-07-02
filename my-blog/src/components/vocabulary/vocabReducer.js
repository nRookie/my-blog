// vocabReducer.js

const initialState = {
    vocabData: []
}

export default function vocabReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_VOCAB_DATA':
            console.log(action.type)
            console.log(state)
            console.log(action.payload)
            return {
                ...state,
                vocabData: action.payload
            };
        case 'ADD_VOCAB_DATA':
            console.log("ADD_VOCAB_DATA called")
            console.log(action.payload)
            console.log(state)
            return {
                ...state,
                vocabData: [...state.vocabData, action.payload]
            }
        default:
            return state;
    }
}
