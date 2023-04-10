import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { thunkCreateBooking } from "../../store/bookings";
import './CreateBooking.css';

const CreateBooking = () => {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([]);

    const spot = useSelector(state => state.spots.singleSpot);
    const user = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newBooking = {
            userId: user.id,
            startDate,
            endDate
        };

        await dispatch(thunkCreateBooking(spot.id, newBooking))
        .catch(
            async(res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        )
    }


    return (
        <div>
            <form className="booking-form" onSubmit={handleSubmit}>
                {/*   */}
                {/* <div className="booking-form-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </div> */}
                <div className="booking-text-container">
                    <div className="booking-form-info-container">
                        <div className="booking-price">
                            ${spot.price} night
                        </div>
                        <div>
                            ★{spot.avgStarRating}
                        </div>
                    </div>
                </div>
                <div className="booking-form-elements">
                    <div className="start-date-container">
                        <label>
                            Check-In:
                        </label>
                            <input
                                placeholder="Start Date"
                                type="date"
                                name="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                    </div>
                    <div className="end-date-container">
                        <label>
                            Check-Out:
                        </label>
                            <input
                                placeholder="End Date"
                                type="date"
                                name="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                    </div>
                    <button onSubmit={handleSubmit}>Reserve</button>
                </div>
            </form>
        </div>
    )
}

export default CreateBooking;