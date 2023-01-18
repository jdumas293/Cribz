import "./SpotCard.css"

export default function SpotCard ({ spot }) {

    return (
        <div className='container'>
            <div className='image-container'>
                <img id='image' src={spot.previewImage} alt={spot.name} />
            </div>
                <div className='details-container'>
                    <div id='other-details'>
                        <h5>{spot.city}, {spot.state}</h5>
                        <h5>★{spot.avgRating}</h5>
                    </div>
                    <div id='price-details'>
                        <h5>${spot.price} night</h5>
                    </div>
                </div>

        </div>
    )
}