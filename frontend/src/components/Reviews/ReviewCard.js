import { useSelector } from "react-redux";
import DeleteReviewModal from "./DeleteReviewModal";
import EditReviewModal from "./EditReviewModal";
import OpenModalButton from "../OpenModalButton";
import './ReviewDetails.css';

export default function ReviewCard ({ review, spotId }) {

    const currUserId = useSelector(state => state.session?.user?.id);

    // function to only show the delete review btn if you have a current review on the spot
    const showDeleteReviewBtn = () => {
        if (currUserId === review.userId) {
            return <OpenModalButton
                buttonText={<i class="fa-solid fa-trash"></i>}
                modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />}
            />
        }
    }

    const showEditReviewBtn = () => {
        if (currUserId === review.userId) {
            return <OpenModalButton
                buttonText={<i class="fa-solid fa-pen-to-square"></i>}
                modalComponent={<EditReviewModal prevReview={review} spotId={spotId} />}
            />
        }
    }
    
    return (
        <>
            <div className='review-container'>
                <div className='review-details'>
                    <div className="review-owner">
                        {review?.User?.firstName} {review?.User?.lastName}
                    </div>
                    <div className="review-body">
                        <p>{review.review}</p>
                    </div>
                </div>
                <div className="review-btns-container">
                    <div className="delete-review-btn">
                        { showDeleteReviewBtn() }
                    </div>
                    <div className="edit-review-btn">
                        { showEditReviewBtn() }
                    </div>
                </div>
            </div>
        </>
    )
}