import { useSelector } from "react-redux";
import DeleteReviewModal from "./DeleteReviewModal";
import EditReviewModal from "./EditReviewModal";
import OpenModalButton from "../OpenModalButton";
import './ReviewCard.css';

export default function ReviewCard ({ review, spotId }) {

    const currUserId = useSelector(state => state.session?.user?.id);

    // function to only show the delete review btn if you have a current review on the spot
    const showDeleteReviewBtn = () => {
        if (currUserId === review.userId) {
            return <OpenModalButton
                buttonText={<i class="fa-solid fa-trash fa-sm"></i>}
                modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />}
            />
        }
    }

    const showEditReviewBtn = () => {
        if (currUserId === review.userId) {
            return <OpenModalButton
                buttonText={<i class="fa-solid fa-pen-to-square fa-sm"></i>}
                modalComponent={<EditReviewModal prevReview={review} spotId={spotId} />}
            />
        }
    }
    
    return (
        <>
            <div className='review-container'>
                <div className="review-profile-image">
                    <i class="fa-solid fa-user"></i>
                </div>
                <div className='review-details'>
                    <div className="review-owner">
                        {review?.User?.firstName} {review?.User?.lastName}
                    </div>
                    <div className="review-body">
                        <p>{review.review}</p>
                    </div>
                </div>
                <div className="review-btns-container">
                    <div className="delete-review-icon">
                        { showDeleteReviewBtn() }
                    </div>
                    <div className="edit-review-icon">
                        { showEditReviewBtn() }
                    </div>
                </div>
            </div>
        </>
    )
}