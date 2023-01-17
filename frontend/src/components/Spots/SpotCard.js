import "./SpotCard.css"

export default function SpotCard ({ spot }) {

    return (
        <div className="spotCard-container">
            <div>
                <img src={spot.previewImage} alt={spot.name} />
                <h5>{spot.city}</h5>
                <h5>${spot.price} night</h5>
                <h6>★{spot.avgRating}</h6>
            </div>
        </div>
    )
}