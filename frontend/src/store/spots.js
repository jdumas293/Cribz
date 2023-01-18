import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/loadSpots';
const GET_DETAILS = 'spots/loadSpotDetails';
const CREATE_SPOT = 'spots/createSpot';

// ACTION CREATORS
export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots
    };
};

export const getSpotDetails = (spot) => {
    return {
        type: GET_DETAILS,
        payload: spot
    }
}

export const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        payload: spot
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

export const thunkGetSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(getSpotDetails(spot));
        return spot;
    }
};

export const thunkCreateSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    });

    if (response.ok) {
        const newSpot = await response.json();
        dispatch(createSpot(newSpot));
        return newSpot;
    }
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
        case GET_DETAILS: {
            const newState = { ...state };
            newState.singleSpot = { ...action.payload };
            return newState;
        }
        case CREATE_SPOT: {
            const newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;