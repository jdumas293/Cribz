import { csrfFetch } from "./csrf";

const GET_BOOKINGS = 'bookings/loadBookings';
const CREATE_BOOKING = 'bookings/createBooking';
const EDIT_BOOKING = 'bookings/updateBooking';
const DELETE_BOOKING = 'booking/deleteBooking';

// ACTION CREATORS
export const getCurrUserBookings = (bookings) => {
    return {
        type: GET_BOOKINGS,
        payload: bookings
    };
};

export const createBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        payload: booking
    };
};

export const editBooking = (booking) => {
    return {
        type: EDIT_BOOKING,
        payload: booking
    };
};

export const deleteBooking = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        payload: bookingId
    };
};


// THUNK ACTION CREATORS
export const thunkGetCurrUserBookings = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings/current');

    if (response.ok) {
        const bookings = await response.json();
        dispatch(getCurrUserBookings(bookings.Bookings));
        return bookings;
    };
};

export const thunkCreateBooking = (spotId, booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    });

    if (response.ok) {
        const newBooking = await response.json();
        dispatch(createBooking(newBooking));
        return newBooking;
    }
};

export const thunkEditBooking = (booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    });

    if (response.ok) {
        const editedBooking = await response.json();
        dispatch(editBooking(editedBooking));
        return editedBooking;
    };
};

export const thunkDeleteBooking = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const booking = await response.json();
        dispatch(deleteBooking(bookingId));
        return booking;
    };
};


// REDUCER
const initialState = { allBookings: {}, singleBooking: {} };

const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_BOOKINGS: {
            newState = { allBookings: {}, singleBooking: {} };
            action.payload.forEach(booking => {
                newState.allBookings[booking.id] = booking;
            });
            return newState;
        }
        case CREATE_BOOKING: {
            newState = { ...state, allBookings: {...state.allBookings}, singleBooking: {...state.singleBooking} };
            newState.singleBooking = action.payload;
            return newState;
        }
        case EDIT_BOOKING: {
            newState = { ...state, allBookings: {...state.allBookings}, singleBooking: {...state.singleBooking} };
            newState.singleSpot = {...state.singleSpot, ...action.payload};
            return newState;
        }
        case DELETE_BOOKING: {
            newState = { ...state, allBookings: {...state.allBookings}, singleBooking: {...state.singleBooking} };
            delete newState.allBookings[action.payload];
            return newState;
        }
        default:
            return state;
    }
}

export default bookingsReducer;