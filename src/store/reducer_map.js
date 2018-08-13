import cloneDeep from 'lodash.clonedeep';

function baseState() {
    return {
        maps: null
    }
}

export const MapLoad = (id) => {
    return {
        type: 'MAP_LOAD',
        payload: id
    }
};

export const MapChange = (x, y) => {
    return {
        type: 'MAP_CHANGE',
        payload: {x, y}
    }
};

export const ReducerMap = (state = baseState(), action) => {

    switch(action.type){

        /**
         * When the map's coordinate has changed
         */
        case 'MAP_CHANGE':
            console.log("CHANGING MAP COORDINATES SUCCESSFULLY");
            console.log(action.payload);
            return {
                ...state
            };

        /**
         * When a map has been loaded
         */
        case 'MAP_LOAD':
            console.log("LOADING MAP SUCCESSFUL");
            const maps = cloneDeep(state.maps);
            maps[action.payload] = {x: 0, y: 0};
            return{
                ...state,
                maps
            };

        default:
            return state;
    }

};