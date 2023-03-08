import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { thunkDeleteReview } from "../../store/reviews";
import { thunkGetSpotDetails } from "../../store/spots";
import './DeleteReview.css';

export default function DeleteReviewModal ({ reviewId, spotId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(thunkDeleteReview(reviewId))
            .then(() => dispatch(thunkGetSpotDetails(spotId)))
            .then(() => history.push(`/spots/${spotId}`))
            .then(closeModal());
    };

    return (
        <div className='delete-review-container'>
            <h3>Are you sure you want to delete this review?</h3>
            <div id='delete-review-btns'>
                <button id='delete-review-btn' onClick={handleDelete}>Delete</button>
                <button id='cancel-delete-btn' onClick={closeModal}>Cancel</button>
            </div>
        </div>
    );
};