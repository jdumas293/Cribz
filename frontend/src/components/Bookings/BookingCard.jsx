import { yearMonthDay } from "../../store/utils";
import OpenModalButton from "../OpenModalButton";
import EditBooking from "./EditBooking";
import DeleteBooking from "./DeleteBooking";
import "./BookingCard.css";

const BookingCard = ({ booking }) => {

    // console.log("BOOKING", booking);

    return (
        <>
            <div className="profile-booking-container">
                <div className="profile-booking-info">
                    <div>
                        Name: {booking.Spot.name}
                    </div>
                    <div>
                        Location: {booking.Spot.city}, {booking.Spot.state}
                    </div>
                    <div>
                        Start Date: {yearMonthDay(booking.startDate)}
                    </div>
                    <div>
                        End Date: {yearMonthDay(booking.endDate)}
                    </div>
                    <div>
                        Price: ${booking.Spot.price}
                    </div>
                    <div className="profile-booking-btn-container">
                        <OpenModalButton 
                            buttonText="Edit"
                            modalComponent={<EditBooking booking={booking} />}
                        />
                        <OpenModalButton 
                            buttonText="Delete"
                            modalComponent={<DeleteBooking booking={booking} />}
                        />
                    </div>
                </div>
                <div className="profile-booking-image-container">
                    <img className="profile-booking-image" src={booking.Spot.previewImage} alt="" />
                </div>
            </div>
        </>
    )
}

export default BookingCard;