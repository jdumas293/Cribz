import { useHistory } from "react-router-dom"
import "./SpotCard.css"

export default function SpotCard ({ spot }) {
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/spots/${spot.id}`);
    }

    return (
        <div className='container' onClick={handleClick}>
            <div className='image-container'>
                <img id='image' src={spot.previewImage} alt={spot.name} />
            </div>
            <div className='details-container'>
                <div id='other-details'>
                    <h5>{spot.city}, {spot.state}</h5>
                    <h5>★{Number(spot.avgRating).toFixed(2)}</h5>
                </div>
                <div id='price-details'>
                    <h5>${spot.price} night</h5>
                </div>
            </div>
        </div>
    )
}