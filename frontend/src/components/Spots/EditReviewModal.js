import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkEditReview } from "../../store/reviews";
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

        dispatch(thunkEditReview(editReview))
            .then(closeModal)
            .catch(
                async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
        history.push(`/spots/${spotId}`);
    }

    return (
        <div>
            <form
                className='review-form'
                onSubmit={handleEdit}
            >
                <h1>Edit Review</h1>
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
                <button onSubmit={handleEdit}>Submit</button>
                <br />
            </form>
        </div>
    )
}
