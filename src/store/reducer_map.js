import cloneDeep from 'lodash.clonedeep';

function baseState() {
    return {
        maps: {}
    }
}

export const MapLoad = (id) => {
    return {
        type: 'MAP_CHANGE',
        payload: {id: id, x: 126.570667, y: 33.450701}
    }
};

export const MapChange = (id, x, y) => {
    return {
        type: 'MAP_CHANGE',
        payload: {id: id, x: parseFloat(x), y: parseFloat(y)}
    }
};

export const ReducerMap = (state = baseState(), action) => {

    switch(action.type){

        /**
         * When the map's coordinate has changed; also used for initiating
         */
        case 'MAP_CHANGE':
            console.log("CHANGING MAP COORDINATES SUCCESSFULLY");
            const maps = cloneDeep(state.maps);
            maps[action.payload.id] = {x: action.payload.x, y: action.payload.y};
            return {
                ...state,
                maps
            };

        default:
            return state;
    }

};