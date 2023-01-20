import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetSpotDetails } from '../../store/spots';
import { thunkGetReviews } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from './DeleteSpotModal';
import UpdateSpotModal from './UpdateSpotModal';
import ReviewCard from './ReviewCard';
import './SpotDetails.css';
import './ReviewDetails.css';
import CreateReviewModal from './CreateReviewModal';

export default function SpotDetails () {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spot = useSelector(state => state.spots.singleSpot);
    const reviews = Object.values(useSelector(state => state.reviews.allReviews));
    // console.log('reviews', reviews);

    useEffect(() => {
        dispatch(thunkGetSpotDetails(spotId));
    }, [dispatch, spotId]);

    useEffect(() => {
        dispatch(thunkGetReviews(spotId));
    }, [dispatch, spotId]);

    return (
        <>
            <div className='spot-details-container'>
                <div id='spot-details'>
                    <h1>{spot.name}</h1>
                    <h5>★{Number(spot.avgStarRating).toFixed(2)} · {spot.numReviews} reviews · {spot.city}, {spot.state}, {spot.country}</h5>
                    <div className='update-delete-container'>
                        <OpenModalButton
                            buttonText="Delete Spot"
                            modalComponent={<DeleteSpotModal spotId={spot.id} />}
                        />
                        <OpenModalButton
                            buttonText="Edit Spot"
                            modalComponent={<UpdateSpotModal spot={spot} />}
                        />
                    </div>
                </div>
                <div className='spot-detail-image-container'>
                    <div id='main-image-container'>
                        <img src={spot.SpotImages && spot.SpotImages[0].url} alt={spot.name}/>
                    </div>
                    {/* <div id='other-images'> */}
                        {/* <img src={} */}
                    {/* </div> */}
                </div>
                <div id='spot-owner-details'>
                    <h3>Hosted by...</h3>
                </div>
                <div id='spot-description-container'>
                    <h4>Description:</h4>
                    <p>{spot.description}</p>
                </div>
            </div>
            <hr id='spot-details-line-break'/>
            <div className='review-display'>
                <h3>★{Number(spot.avgStarRating).toFixed(2)} · {spot.numReviews} reviews</h3>
                <div className='create-delete-review-container'>
                    <OpenModalButton
                        buttonText="Create Review"
                        modalComponent={<CreateReviewModal spotId={spot.id}/>}
                    />
                </div>
                <div className='reviewCard-list'>
                    {reviews.map(review => <ReviewCard review={review} spotId={spotId} key={review.id}/>)}
                </div>
                <br />
                <br />
            </div>
        </>
    )
}