import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/loadReviews';
const CREATE_REVIEW = 'reviews/createReview';
const DELETE_REVIEW = 'reviews/deleteReview';

// ACTION CREATORS
export const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        payload: reviews
    };
};

export const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        payload: review
    };
};

export const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        payload: reviewId
    };
};

// THUNK ACTION CREATORS
export const thunkGetReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(getReviews(reviews.Reviews));
        return reviews;
    };
};

export const thunkCreateReview = (review, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(createReview(review));
        return review;
    };
};

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(deleteReview(review.id));
        return review;
    };
};

// REDUCER
const initialState = { allReviews: {}, singleReview: {} };

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEWS: {
            newState = { ...state, allReviews: {...state.allReviews}, singleReview: {...state.singleReview} };
            action.payload.forEach(review => {
                newState.allReviews[review.id] = review;
            });
            return newState;
        }
        case CREATE_REVIEW: {
            newState = { ...state, allReviews: {...state.allReviews}, singleReview: {...state.singleReview} };
            newState.singleReview = { ...state.singleReview, ...action.payload };
            return newState;
        }
        case DELETE_REVIEW: {
            newState = { ...state, allReviews: {...state.allReviews}, singleReview: {...state.singleReview} };
            delete newState.allSpots[action.payload];
            return newState;
        }
        default:
            return state;
    }
}

export default reviewsReducer;