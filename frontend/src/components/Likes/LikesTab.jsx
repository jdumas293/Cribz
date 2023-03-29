import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetLikes } from "../../store/likes";
import LikeCard from "./LikeCard";
import './LikesTab.css';

const LikesTab = () => {
    const dispatch = useDispatch();
    const likes = Object.values(useSelector(state => state.likes.allLikes));
    // console.log("LIKES", likes);

    useEffect(() => {
        dispatch(thunkGetLikes(likes));
    }, [dispatch])

    return (
        <div>
            {likes.map(like => <LikeCard like={like} key={like.id} />)}
        </div>
    )
}

export default LikesTab;