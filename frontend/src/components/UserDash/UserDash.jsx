import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCurrUserBookings } from "../../store/bookings";
import ShowCurrUserBookings from "../Bookings/ShowCurrUserBookings";
import "./UserDash.css";

const UserDash = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const bookings = Object.values(useSelector(state => state.bookings.allBookings));
    // console.log("USER", user);

    useEffect(() => {
        dispatch(thunkGetCurrUserBookings(user.id));
    }, [dispatch])

    return (
        <div className="profile-container">
            <div className="profile-info">
                <div className="profile-username">
                    {user.username}
                </div>
                <div className="profile-num-bookings">
                    {bookings.length} Bookings
                </div>
            </div>
            <div className="profile-bookings">
                <ShowCurrUserBookings />
            </div>
        </div>
    )
}

export default UserDash;