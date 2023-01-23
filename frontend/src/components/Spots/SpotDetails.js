import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetSpotDetails } from '../../store/spots';
import { thunkGetReviews } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from './DeleteSpotModal';
import UpdateSpotModal from './UpdateSpotModal';
import ReviewCard from './ReviewCard';
import CreateReviewModal from './CreateReviewModal';
import './SpotDetails.css';
import './ReviewDetails.css';
import logoImg from '../../assets/cribz-black.png';

export default function SpotDetails () {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spot = useSelector(state => state.spots.singleSpot);
    const reviews = Object.values(useSelector(state => state.reviews.allReviews));

    const isNumber = (num) => {
        if (isNaN(num)) return 'n/a';
        else return Number(num).toFixed(2);
    };

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
                    <div className='spot-name-rating-location-container'>
                        <h1>{spot.name}</h1>
                        <h5>★{isNumber(spot.avgStarRating)} · {spot.numReviews} reviews · {spot.city}, {spot.state}, {spot.country}</h5>
                    </div>
                    <div className='update-delete-container'>
                        <div id='delete-spot-btn-container'>
                            <OpenModalButton
                                buttonText="Delete Spot"
                                modalComponent={<DeleteSpotModal spotId={spot.id} />}
                            />
                        </div>
                        <div id='edit-spot-btn-container'>
                            <OpenModalButton
                                buttonText="Edit Spot"
                                modalComponent={<UpdateSpotModal spot={spot} />}
                            />
                        </div>
                    </div>
                </div>
                <div className='spot-detail-image-container'>
                    <div id='main-image-container'>
                        <img src={spot.SpotImages && spot.SpotImages[0].url} alt={spot.name}/>
                    </div>
                    <div id='other-images-half-1'>
                        <div id='other-img-1'>
                            <img src={logoImg} alt='Cribz' />
                        </div>
                        <div id='other-img-2'>
                            <img src={logoImg} alt='Cribz' />
                        </div>
                    </div>
                    <div id='other-images-half-2'>
                        <div id='other-img-3'>
                            <img src={logoImg} alt='Cribz' />
                        </div>
                        <div id='other-img-4'>
                            <img src={logoImg} alt='Cribz' />
                        </div>
                    </div>
                </div>
                <div id='spot-owner-details'>
                    <h3>Hosted by Demo</h3>
                    <h5>4 guests · 3 bedrooms · 3 beds · 4 baths</h5>
                </div>
                <hr id='description-line-break' />
                <div id='spot-description-container'>
                    <p>{spot.description}</p>
                </div>
            </div>
            <hr id='spot-details-line-break'/>
            <div className='review-display'>
                <h3>★{isNumber(spot.avgStarRating)} · {spot.numReviews} reviews</h3>
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