import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/loadSpots';

// ACTION CREATORS
export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots
    };
};

// THUNK ACTION CREATORS
export const thunkGetSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
        const spots = await response.json();
        console.log('spots', spots);
        dispatch(getSpots(spots));
        return spots;
    };
};

// REDUCER
const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS: {
            const newState = { ...state };
            action.payload.Spots.forEach(spot => {
                newState[spot.id] = spot;
            });
            // console.log(newState);
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;