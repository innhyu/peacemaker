import cloneDeep from 'lodash.clonedeep';
import WayFinder from '../util/Wayfinder';

function baseState() {
    return {
        maps: {},
        midPoint: null
    }
}

/**
 * Function that loads the map to the maps store object, with initial location set to Kakao.
 *
 * @param id - the id of the map div
 */
export const MapLoad = (id) => {
    return {
        type: 'MAP_CHANGE',
        payload: {id: id, x: 126.570667, y: 33.450701}
    }
};

/**
 * Function that changes the locations shown on the map based on the x and y coordinate
 *
 * @param id - the id of the map div
 * @param x - x coordinate of the desired location
 * @param y - y coordinate of the desired location
 */
export const mapChange = (id, x, y) => {
    return {
        type: 'MAP_CHANGE',
        payload: {id: id, x: parseFloat(x), y: parseFloat(y)}
    }
};

/**
 * Function that prompts the midpoint to be calculated
 */
export const findMidpoint = () => {
    return {
        type: 'FIND_MID_POINT'
    }
};

export const ReducerMap = (state = baseState(), action) => {

    let maps;

    switch(action.type){

        /**
         * When the map's coordinate has changed; also used for initiating
         */
        case 'MAP_CHANGE':
            console.log("CHANGING MAP COORDINATES SUCCESSFULLY");
            maps = cloneDeep(state.maps);
            maps[action.payload.id] = {x: action.payload.x, y: action.payload.y};
            return {
                ...state,
                maps
            };

        /**
         * Find the mid-point using the WayFinder util
         */
        case 'FIND_MID_POINT':
            console.log("FINDING MIDPOINT");
            const midpoint = WayFinder.midPoint(Object.values(state.maps));
            return {
                ...state,
                midpoint

            };

        default:
            return state;
    }

};