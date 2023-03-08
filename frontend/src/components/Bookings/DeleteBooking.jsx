import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteBooking } from "../../store/bookings";
import "./DeleteBooking.css";

const DeleteBooking = ({ booking }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(thunkDeleteBooking(booking.id));
        closeModal();
    };

    return (
        <div className="delete-booking-container">
            <div className="delete-booking-message">
                <p>Are you sure you want to delete your booking?</p>
            </div>
            <div className="delete-booking-btn-container">
                <button className="inner-delete-booking-btn" onClick={handleDelete}>
                    Delete
                </button>
                <button className="cancel-delete-booking-btn" onClick={closeModal}>
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default DeleteBooking;