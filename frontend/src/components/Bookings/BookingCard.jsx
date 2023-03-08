import { yearMonthDay } from "../../store/utils";
import "./BookingCard.css";

const BookingCard = ({ booking }) => {

    console.log("BOOKING", booking);
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
                </div>
                <div className="profile-booking-image-container">
                    <img className="profile-booking-image" src={booking.Spot.previewImage} alt="" />
                </div>
            </div>
        </>
    )
}

export default BookingCard;