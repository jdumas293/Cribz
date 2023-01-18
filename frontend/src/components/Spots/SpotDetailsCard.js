import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from './DeleteSpotModal';
import './SpotDetails.css'

export default function SpotDetailsCard ({ spot }) {

    return (
        <>
            <div className='spot-details-container'>
                <div id='spot-details'>
                    <h1>{spot.name}</h1>
                    <h5>★{spot.avgStarRating} ... {spot.numReviews} reviews ... {spot.city}, {spot.state}, {spot.country}</h5>
                </div>
                <div className='image-container'>
                    <div id='main-image'>
                        Main Image Here
                    </div>
                    <div id='other-images'>
                        Other Images
                    </div>
                </div>
                <br />
                <div className='delete-update'>
                    <OpenModalButton
                        buttonText="Delete Spot"
                        modalComponent={<DeleteSpotModal spotId={spot.id} />}
                    />
                </div>
            </div>
        </>

    )
}