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
    // console.log("SPOT ===>", spot);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newBooking = {
            userId: user.id,
            startDate,
            endDate
        };

        // console.log("NEW BOOKING ===>", newBooking);

        await dispatch(thunkCreateBooking(spot.id, newBooking))
            .then(history.push(`/dashboard/${user.id}`))
            .catch(
                async(res) => {
                    const data = await res.json();
                    // console.log("DATA", data);
                    if (data && data.errors) setErrors(data.errors);
                    // console.log("ERRORS", errors);
                }
            )
    }


    return (
        <div>
            <form className="booking-form" onSubmit={handleSubmit}>
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