import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { thunkCreateBooking } from "../../store/bookings";
import './CreateBooking.css';

const CreateBooking = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([]);

    const spot = useSelector(state => state.spots.singleSpot);
    console.log("SPOT ===>", spot.id);
    const user = useSelector(state => state.session.user);
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        const newBooking = {
            userId: user.id,
            startDate,
            endDate
        };

        console.log("NEW BOOKING ===>", newBooking)

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
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className="booking-form-details-container">
                    <div className="start-date-container">
                        <label>
                            Start Date:
                            <input
                                type="date"
                                name="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="end-date-container">
                        <label>
                            End Date:
                            <input
                                type="date"
                                name="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </label>
                    </div>
                    <button onSubmit={handleSubmit}>Create Booking</button>
                </div>
            </form>
        </div>
    )
}

export default CreateBooking;