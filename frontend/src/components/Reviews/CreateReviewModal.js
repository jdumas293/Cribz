import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateReview, thunkGetReviews } from "../../store/reviews";
import { thunkGetSpotDetails } from "../../store/spots";
import './CreateReviewModal.css';

export default function CreateReviewModal ({ spotId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const user = useSelector(state => state.session.user);
    const spot = useSelector(state => state?.spots?.singleSpot);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newReview = {
            review,
            stars
        }

        await dispatch(thunkCreateReview(newReview, spotId, user))
            .then(closeModal)
            .catch(
                async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            )

            // dispatch(thunkGetReviews(spot.id));
            dispatch(thunkGetSpotDetails(spot.id));
    }

    return (
        <form className='review-form' onSubmit={handleSubmit}>
            <div className="review-form-errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </div>
            <div className="review-form-elements">
                <div className="review-body">
                    <textarea
                        placeholder="Your review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>
                <div className="review-rating">
                    <select
                        name='stars'
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                    >
                        <option selected>Your rating...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <button onSubmit={handleSubmit}>Submit</button>
            </div>
        </form>
    )
}