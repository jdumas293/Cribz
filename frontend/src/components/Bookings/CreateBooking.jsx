import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { thunkCreateBooking } from "../../store/bookings";
import Calendar from "react-select-date";
import './CreateBooking.css';

const CreateBooking = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([]);

    const spot = useSelector(state => state.spots.singleSpot);
    const user = useSelector(state => state.session.user);
    console.log("SPOT ===>", spot);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        const newBooking = {
            userId: user.id,
            startDate,
            endDate
        };

        // console.log("NEW BOOKING ===>", newBooking);

        dispatch(thunkCreateBooking(spot.id, newBooking))
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
                {/* <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul> */}
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
                <div className="booking-form-details-container">
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
                    {/* <Calendar
                        className="calendar"
                        onSelect={(date) => console.log(date)}
                        selectDateType="range"
                    /> */}
                    <button onSubmit={handleSubmit}>Reserve</button>
                </div>
            </form>
        </div>
    )
}

export default CreateBooking;