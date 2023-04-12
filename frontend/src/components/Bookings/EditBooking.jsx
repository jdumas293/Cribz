import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditBooking } from "../../store/bookings";
import { thunkGetCurrUserBookings } from "../../store/bookings";
import { yearMonthDay } from "../../store/utils";
import "./EditBooking.css";

const EditBooking = ({ booking }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [startDate, setStartDate] = useState(booking.startDate);
    const [endDate, setEndDate] = useState(booking.endDate);
    const [errors, setErrors] = useState([]);

    const handleEdit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const editedBooking = {
            ...booking,
            startDate,
            endDate
        };

        await dispatch(thunkEditBooking(editedBooking))
            .then(closeModal)
            .catch(
                async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            )

            dispatch(thunkGetCurrUserBookings());
    };

    useEffect(() => {
        console.log("SD", startDate)
        console.log("ED", endDate)
    }, [])

    return (
        <div>
            <form className="edit-booking-form" onSubmit={handleEdit}>
                <div className="edit-booking-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </div>
                <div className="edit-booking-elements">
                    <div className="edit-start-date">
                        <input
                            type="date"
                            name="startDate"
                            value={yearMonthDay(startDate)}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="edit-end-date">
                        <input
                            type="date"
                            name="endDate"
                            value={yearMonthDay(endDate)}
                            onChange={(e) => setEndDate(e.target.value) }
                        />
                    </div>
                    <button onSubmit={handleEdit}>Edit</button>
                </div>
            </form>
        </div>
    )
} 


export default EditBooking;