import { combineReducers } from 'redux';

import KeywordReducer from './reducer_keyword';
import { ReducerSearch } from './reducer_search';
import { ReducerMap } from './reducer_map';

const rootReducers = combineReducers({
    keyword: KeywordReducer,
    searchResult: ReducerSearch,
    maps: ReducerMap

});

export default rootReducers;