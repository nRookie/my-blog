// store.js

import vocabReducer from './vocabReducer';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
    reducer: {
        vocabulary: vocabReducer,
    },
});

