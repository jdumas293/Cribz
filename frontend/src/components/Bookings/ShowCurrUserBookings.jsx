import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCurrUserBookings } from "../../store/bookings";
import BookingCard from "./BookingCard";

const ShowCurrUserBookings = () => {
    const dispatch = useDispatch();
    const bookings = Object.values(useSelector(state => state.bookings.allBookings));

    console.log("BOOKINGS ===>", bookings);

    useEffect(() => {
        dispatch(thunkGetCurrUserBookings());
    }, [dispatch]);

    return (
        <div>
            {bookings.map(booking => <BookingCard booking={booking} />)}
        </div>
    )
}

export default ShowCurrUserBookings;