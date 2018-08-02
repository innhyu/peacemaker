const baseState = {
    searchResult: null
};

export const searchSuccess = (searchResult) => {
    return {
        type: 'SEARCH_SUCCESS',
        payload: searchResult
    }
};

export const ReducerSearch = (state = baseState, action) => {
    switch(action.type){
        case 'SEARCH_SUCCESS':
            return {
                ...state,
                searchResult: action.payload
            };
        default:
            return state
    }
};