export const searchSuccess = (searchResult) => {
    return {
        type: 'SEARCH_SUCCESS',
        payload: searchResult
    }
};

export const ReducerSearch = (state, action) => {
    switch(action.type){
        case 'SEARCH_SUCCESS':
            return {
                ...state,
                searchResult: action.payload
            }
    }
};