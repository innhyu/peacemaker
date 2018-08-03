const baseState = {
    searchResult: {locations: [
        {place_name: "abc", address_name: "example address 1", road_address_name: "example address 2"},
        {place_name: "abc", address_name: "example address 1", road_address_name: "example address 2"},
        {place_name: "abc", address_name: "example address 1", road_address_name: "example address 2"}],
        pagination: 'hi'}
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