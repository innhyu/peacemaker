import { combineReducers } from 'redux';

import { ReducerMap } from './reducer_map';

const rootReducers = combineReducers({
    maps: ReducerMap

});

export default rootReducers;