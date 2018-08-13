function baseState() {
    return {
        maps: null
    }
};

export const MapChange = (mapObject) => {
    return {
        type: 'MAP_CHANGE',
        payload: mapObject
    }
};

export const ReducerMap = (state = baseState(), action) => {

    switch(action.type){

        case 'MAP_CHANGE':
            return {

            };
        default:
            return state;
    }

};