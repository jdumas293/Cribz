import './LikeCard.css';

const LikeCard = ({ like }) => {
    return (
        <div className="profile-likes-container">
            <div className="profile-likes-info">
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
            <div className="profile-likes-img-container">
                <img src={like.Spot.SpotImages[0].url} />
            </div>
        </div>
    )
}

export default LikeCard;