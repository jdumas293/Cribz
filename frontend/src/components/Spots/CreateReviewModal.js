import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateReview } from "../../store/reviews";
import './ReviewModal.css';

export default function CreateReviewModal ({ spotId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newReview = {
            review,
            stars
        }

        dispatch(thunkCreateReview(newReview, spotId))
            .then(closeModal)
            .catch(
                async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            )
            history.push(`/spots/${spotId}`);
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
                <label>
                    Review:
                    <br />
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </label>
                <label>
                    Stars:
                    <br />
                    <input
                        type='number'
                        name='stars'
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                    />
                </label>
                <br />
                <button onSubmit={handleSubmit}>Submit</button>
                <br />
            </form>
        </div>
    )
}