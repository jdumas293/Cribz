import { csrfFetch } from './csrf';

const GET_LIKES = 'likes/getLikes';
const CREATE_LIKE = 'likes/createLike';
const DELETE_LIKE = 'likes/deleteLike';

// ACTION CREATORS
export const actionGetLikes = (likes) => {
    return {
        type: GET_LIKES,
        payload: likes
    };
};

export const actionCreateLike = (like) => {
    return {
        type: CREATE_LIKE,
        payload: like
    };
};

export const actionDeleteLike = (like) => {
    return {
        type: DELETE_LIKE,
        payload: like
    };
};

// THUNK ACTION CREATORS
export const thunkGetLikes = () => async (dispatch) => {
    const res = await csrfFetch('/api/likes/current', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const likes = await res.json();
        dispatch(actionGetLikes(likes.Likes));
    };
};

export const thunkCreateLike = (spotId, like) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/likes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(like)
    });

    if (res.ok) {
        const like = await res.json();
        dispatch(actionCreateLike(like));
        return like;
    }
};

export const thunkDeleteLike = (likeId) => async (dispatch) => {
    const res = await csrfFetch(`/api/likes/${likeId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const like = await res.json();
        dispatch(actionDeleteLike(like));
        return like;
    };
};

// REDUCER
const initialState = { allLikes: {}, singleLike: {} };

const likesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_LIKES: {
            newState = { allLikes: {} };
            action.payload.forEach(like => {
                newState.allLikes[like.id] = like;
            });
            return newState;
        }
        case CREATE_LIKE: {
            newState = { ...state, allLikes: {...state.allLikes}, singleLike: {...state.singleLike} };
            newState.singleLike = action.payload;
            return newState;
        }
        case DELETE_LIKE: {
            newState = { ...state, allLikes: {...state.allLikes}, singleLike: {...state.singleLike} };
            delete newState.allLikes[action.payload];
            return newState;
        }
        default:
            return state;
    }
}

export default likesReducer;