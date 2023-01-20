import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkDeleteReview } from "../../store/reviews";
import './DeleteReview.css';

export default function DeleteReviewModal ({ reviewId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();

        dispatch(thunkDeleteReview(reviewId));
        closeModal();
        history.push('/');
    };

    return (
        <div className='delete-review-container'>
            <h3>Are you sure you want to delete this review?</h3>
            <div id='delete-review-btns'>
                <button id='delete-review-btn' onClick={handleDelete}>Delete</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
    );
};