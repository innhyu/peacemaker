import { combineReducers } from 'redux';

import KeywordReducer from './reducer_keyword';

const rootReducers = combineReducers({
    keyword: KeywordReducer
});

export default rootReducers;