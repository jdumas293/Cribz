import DeleteReviewModal from "./DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";

export default function ReviewCard ({ review }) {
    return (
        <>
            <div className='review-container'>
                <div id='review-details'>
                    <h5>{review.User.firstName} {review.User.lastName}:</h5>
                    <p>{review.review}</p>
                    <OpenModalButton
                        buttonText='Delete Review'
                        modalComponent={<DeleteReviewModal reviewId={review.id}/>}
                    />
                </div>
            </div>
        </>
    )
}