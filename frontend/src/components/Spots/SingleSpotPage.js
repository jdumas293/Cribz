import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetSpotDetails } from '../../store/spots';
import { thunkGetReviews } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from './DeleteSpotModal';
import EditSpotModal from './EditSpotModal';
import ReviewCard from '../Reviews/ReviewCard';
import CreateReviewModal from '../Reviews/CreateReviewModal';
import CreateBooking from '../Bookings/CreateBooking';
import './SingleSpotPage.css';
import '../Reviews/ReviewCard.css';

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
                buttonText="Delete"
                modalComponent={<DeleteSpotModal spotId={spot.id} />}
            />
        }
    }

    // function to only show the edit spot btn if you are the current owner of the spot
    const showEditSpotBtn = () => {
        if (currUserId === spot.ownerId) {
            return <OpenModalButton
                buttonText="Edit"
                modalComponent={<EditSpotModal spot={spot} />}
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
                        <i class="fa-solid fa-star"></i>&nbsp;
                        {isNumber(spot.avgStarRating)} · {spot.numReviews} reviews · {spot.city}, {spot.state}, {spot.country}
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
                <div className='other-img-container'>
                    <div className='top-img-container'>
                        <div className='top-left-img'>
                            <img src='https://ecowellness.com/wp-content/uploads/2017/04/property.jpg' />
                        </div>
                        <div className='top-right-img'>
                            <img src='https://ecowellness.com/wp-content/uploads/2017/04/property.jpg' />
                        </div>
                    </div>
                    <div className='bottom-img-container'>
                        <div className='bottom-left-img'>
                            <img src='https://ecowellness.com/wp-content/uploads/2017/04/property.jpg' />
                        </div>
                        <div className='bottom-right-img'>
                            <img src='https://ecowellness.com/wp-content/uploads/2017/04/property.jpg' />
                        </div>
                    </div>
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
                        <p className='spot-description-text'>{spot.description}</p>
                    </div>
                    <div className='additional-spot-details'>
                        <img className="aircover-logo" src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg'></img>
                        <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
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
                            buttonText="New Review"
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