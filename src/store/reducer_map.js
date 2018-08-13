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


            };

        /**
         * When a map has been loaded
         */
        case 'MAP_LOAD':
            console.log("LOADING MAP SUCCESSFUL");
            return{

            };

        default:
            return state;
    }

};