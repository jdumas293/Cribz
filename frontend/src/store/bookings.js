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
        default:
            return state;
    }
}

export default bookingsReducer;