import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateReview, thunkGetReviews } from "../../store/reviews";
import { thunkGetSpotDetails } from "../../store/spots";
import './ReviewModal.css';

export default function CreateReviewModal ({ spotId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const user = useSelector(state => state.session.user);

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

            dispatch(thunkGetReviews());
    }

    return (
        <div>
            <form
                className='review-form'
                onSubmit={handleSubmit}
            >
                <h1>Create Review</h1>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label id='review-input-label'>
                    Review:
                    <br />
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </label>
                <label id='stars-input-label'>
                    Stars:
                    &nbsp;
                    <select
                        name='stars'
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                    >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </label>
                <br />
                <button onSubmit={handleSubmit}>Submit</button>
                <br />
            </form>
        </div>
    )
}