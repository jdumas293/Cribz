import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/loadSpots';
const GET_DETAILS = 'spots/loadSpotDetails';
const CREATE_SPOT = 'spots/createSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';

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
    };
};

export const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        payload: spot
    };
};

export const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        payload: spot
    };
};

export const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        payload: spotId
    };
};

// THUNK ACTION CREATORS
export const thunkGetSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
        dispatch(getSpots(spots.Spots));
        return spots;
    };
};

export const thunkGetSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        // console.log(spot);
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
    })

    if (response.ok) {
        const newSpot = await response.json();
        dispatch(createSpot(newSpot));
        return newSpot;
    }
};

export const thunkUpdateSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const updatedSpot = await response.json();
        dispatch(updateSpot(updatedSpot));
        return updatedSpot;
    }
};

export const thunkDeleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(deleteSpot(spot.id));
        return spot;
    }
};

// REDUCER
const initialState = { allSpots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS: {
            newState = { ...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot} };
            action.payload.forEach(spot => {
                newState.allSpots[spot.id] = spot;
            });
            return newState.allSpots;
        }
        case GET_DETAILS: {
            newState = { ...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot, ...action.payload} };
            return newState.singleSpot;
        }
        case CREATE_SPOT: {
            const newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case UPDATE_SPOT: {
            const newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case DELETE_SPOT: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;