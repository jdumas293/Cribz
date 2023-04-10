import { useHistory } from "react-router-dom";
import './LikeCard.css';

const LikeCard = ({ like }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/spots/${like.Spot.id}`);
    };

    return (
        <div className="profile-likes-container">
            <div className="profile-likes-info" onClick={handleClick}>
                <div>
                    Name: {like.Spot.name}
                </div>
                <div>
                    Location: {like.Spot.city}, {like.Spot.state}
                </div>
                <div>
                    Price: ${like.Spot.price}
                </div>
            </div>
            <div className="profile-likes-img-container" onClick={handleClick}>
                <img src={like.Spot.SpotImages[0].url} />
            </div>
        </div>
    )
}

export default LikeCard;