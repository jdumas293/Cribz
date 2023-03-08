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
import CreateBooking from '../Bookings/CreateBooking';

export default function SpotDetails () {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spot = useSelector(state => state.spots.singleSpot);
    const reviews = Object.values(useSelector(state => state.reviews.allReviews));
    const currUserId = useSelector(state => state.session?.user?.id);

    const isNumber = (num) => {
        if (isNaN(num)) return 'n/a';
        else return Number(num).toFixed(2);
    };

    // function to only show the delete spot btn if you are the current owner of the spot
    const showDeleteSpotBtn = () => {
        if (currUserId === spot.ownerId) {
            return <OpenModalButton
                buttonText="Delete Spot"
                modalComponent={<DeleteSpotModal spotId={spot.id} />}
            />
        }
    }

    // function to only show the edit spot btn if you are the current owner of the spot
    const showEditSpotBtn = () => {
        if (currUserId === spot.ownerId) {
            return <OpenModalButton
                buttonText="Edit Spot"
                modalComponent={<UpdateSpotModal spot={spot} />}
            />
        }
    }

    useEffect(() => {
        dispatch(thunkGetSpotDetails(spotId));
    }, [dispatch, spotId]);

    useEffect(() => {
        dispatch(thunkGetReviews(spotId));
    }, [dispatch, spotId]);

    return (
        <>
            <div className='spot-details-container'>
                <div className='spot-details'>
                    <div className='spot-details-name'>
                        {spot.name}
                    </div>
                    <div className='spot-details-rating'>
                        ★{isNumber(spot.avgStarRating)} · {spot.numReviews} reviews · {spot.city}, {spot.state}, {spot.country}
                    </div>
                </div>
                <div className='update-delete-spot-container'>
                    <div id='delete-spot-btn-container'>
                        { showDeleteSpotBtn() }
                    </div>
                    <div id='edit-spot-btn-container'>
                        { showEditSpotBtn() }
                    </div>
                </div>
            </div>
            <div className='spot-detail-image-container'>
                <div id='main-image-container'>
                    <img src={spot.SpotImages && spot.SpotImages[0].url} alt={spot.name}/>
                </div>
            </div>
            <div className='middle-container'>
                <div className='details-booking-container'>
                    <div className='spot-owner-details'>
                        <div className='hosted-by'>
                            Hosted by Demo
                        </div>
                        <div className='num-bed-bath'>
                            4 guests · 3 bedrooms · 3 beds · 4 baths
                        </div>
                    </div>
                    <div id='spot-description-container'>
                        <p>{spot.description}</p>
                    </div>
                </div>
                <div className='booking-container'>
                    <CreateBooking />
                </div>
            </div>
            <div className='bottomhalf-container'>
                <div className='review-display'>
                    <div className='review-header'>
                        ★{isNumber(spot.avgStarRating)} · {spot.numReviews} reviews
                    </div>
                    <div className='create-delete-review-container'>
                        <OpenModalButton
                            buttonText="Create Review"
                            modalComponent={<CreateReviewModal spotId={spot.id}/>}
                        />
                    </div>
                </div>
            </div>
            <div className='reviewCard-container'>
                <div className='reviewCard-list'>
                    {reviews.map(review => <ReviewCard review={review} spotId={spotId} key={review.id}/>)}
                </div>     
            </div>
        </>
    )
}