import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateLike, thunkDeleteLike, thunkGetLikes } from '../../store/likes';

const FavoriteButton = ({ spotId }) => {
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(false);
    const [likeId, setLikeId] = useState();
    // const like = useSelector(state => state?.likes?.singleLike);
    const likes = Object.values(useSelector(state => state.likes.allLikes));
    const user = useSelector(state => state.session.user);

    const handleClick = async (e) => {
        e.preventDefault();
        
        if (isLiked) {
            await dispatch(thunkDeleteLike(likeId))
            .then(setIsLiked(false))
        } else {
            await dispatch(thunkCreateLike(spotId))
            .then(setIsLiked(true))
            .then(likes.forEach(like => {
                if (like.spotId === Number(spotId) && like.userId === user.id) {
                    setLikeId(like.id)
                }
            }))
        }
    };

    useEffect(() => {
        if (likes) {
            likes.forEach(like => {
                if (like.spotId === Number(spotId) && like.userId === user.id) {
                    setIsLiked(true);
                    setLikeId(like.id);
                }
            });
        }
    }, []);

    return (
        <div onClick={handleClick}>
            {isLiked ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
        </div>
    )
}

export default FavoriteButton;