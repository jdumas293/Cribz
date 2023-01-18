import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from './DeleteSpotModal';
import UpdateSpotModal from './UpdateSpotModal';
import './SpotDetails.css'

export default function SpotDetailsCard ({ spot }) {

    return (
        <>
            <div className='spot-details-container'>
                <div id='spot-details'>
                    <h1>{spot.name}</h1>
                    <h5>★{spot.avgStarRating} · {spot.numReviews} reviews · {spot.city}, {spot.state}, {spot.country}</h5>
                    <div className='update-delete-container'>
                        <OpenModalButton
                            buttonText="Delete Spot"
                            modalComponent={<DeleteSpotModal spotId={spot.id} />}
                        />
                            <OpenModalButton
                                buttonText="Edit Spot"
                                modalComponent={<UpdateSpotModal spotId={spot.id} />}
                            />
                    </div>
                </div>
                <div className='spot-detail-image-container'>
                    <div id='main-image-container'>
                        <img src={spot.SpotImages[0].url} alt={spot.name}/>
                    </div>
                    <div id='other-images'>
                        Other Images
                    </div>
                </div>
            </div>
            <div className='reviews-container'>
                <h1>Reviews</h1>
            </div>
        </>

    )
}