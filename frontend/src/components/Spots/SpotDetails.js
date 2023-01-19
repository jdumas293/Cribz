import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetSpotDetails } from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from './DeleteSpotModal';
import UpdateSpotModal from './UpdateSpotModal';
import './SpotDetails.css'

export default function SpotDetails () {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spot = useSelector(state => state.spots);

    useEffect(() => {
        dispatch(thunkGetSpotDetails(spotId));
    }, [dispatch, spotId]);

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
                        {/* <img src={spot.SpotImages.url} alt={spot.name}/> */}
                    </div>
                    <div id='other-images'>
                        {/* <img src={} */}
                    </div>
                </div>
            </div>
            <div className='reviews-container'>
                <h1>Reviews</h1>
            </div>
        </>
    )
}