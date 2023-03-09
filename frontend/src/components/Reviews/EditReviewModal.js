import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkEditReview, thunkGetReviews } from "../../store/reviews";
import { thunkGetSpotDetails } from "../../store/spots";
import "./EditReviewModal.css";


export default function EditReviewModal({ prevReview, spotId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState(prevReview.review);
    const [stars, setStars] = useState(prevReview.stars);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleEdit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const editReview = {
            ...prevReview,
            review,
            stars
        };

        await dispatch(thunkEditReview(editReview))
            .then(closeModal)
            .catch(
                async(res) => {
                    const data = await res?.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
        // history.push(`/spots/${spotId}`);
        // await dispatch(thunkGetReviews(spotId));
        dispatch(thunkGetSpotDetails(spotId));
    }

    return (
        <div>
            <form
                className='edit-review-form'
                onSubmit={handleEdit}
            >
                <div className="edit-review-form-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </div>
                <div className="edit-review-form-elements">
                    <div className="edit-review-form-body">
                        <textarea
                            placeholder="Your review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </div>
                    <div className="edit-review-form-stars">
                        <select
                            name='stars'
                            value={stars}
                            onChange={(e) => setStars(e.target.value)}
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <button onSubmit={handleEdit}>Submit</button>
                </div>
            </form>
        </div>
    )
}
