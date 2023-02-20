import { csrfFetch } from "./csrf";

const GET_BOOKINGS = 'bookings/loadBookings';
const CREATE_BOOKING = 'bookings/createBooking';
const UPDATE_BOOKING = 'bookings/updateBooking';
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


// THUNK ACTION CREATORS
export const thunkGetCurrUserBookings = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings/current');

    if (response.ok) {
        const bookings = await response.json();
        // console.log("BOOKINGS ===>", bookings)
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
        default:
            return state;
    }
}

export default bookingsReducer;