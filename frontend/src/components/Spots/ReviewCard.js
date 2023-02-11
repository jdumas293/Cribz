import { useSelector } from "react-redux";

import DeleteReviewModal from "./DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";
import './ReviewDetails.css';

export default function ReviewCard ({ review, spotId }) {

    const currUserId = useSelector(state => state.session?.user?.id);

    // function to only show the delete review btn if you have a current review on the spot
    const showDeleteReviewBtn = () => {
        if (currUserId === review.userId) {
            return <OpenModalButton
                buttonText='Delete'
                modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />}
            />
        }
    }

    const showEditReviewBtn = () => {
        if (currUserId === review.userId) {
            return <OpenModalButton
                buttonText='Edit'
                // modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />}
            />
        }
    }
    
    return (
        <>
            <div className='review-container'>
                <div id='review-details'>
                    <h5>{review.User.firstName} {review.User.lastName}:</h5>
                    <p>{review.review}</p>
                    { showDeleteReviewBtn() }
                    { showEditReviewBtn() }
                </div>
            </div>
        </>
    )
}