import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetCurrUserBookings } from "../../store/bookings";
import ShowCurrUserBookings from "../Bookings/ShowCurrUserBookings";
import FavoritesTab from "../Favorites/FavoritesTab";
import "./UserDash.css";

const UserDash = ({ tabOverride }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const bookings = Object.values(useSelector(state => state.bookings.allBookings));
    // console.log("USER", user);

    const [selectedTab, setSelectedTab] = useState(tabOverride ? tabOverride : 'ShowCurrUserBookings');

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    };

    useEffect(() => {
        
        if (selectedTab === 'ShowCurrUserBookings') {
            history.push(`/bookings/${user.id}`);
        };

        if (selectedTab === 'FavoritesTab') {
            history.push(`/favorites/${user.id}`)
        }

        dispatch(thunkGetCurrUserBookings(user.id));

    }, [dispatch, user, selectedTab])

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
            <div className="profile-tab-container">
                <div 
                    className={`profile-bookings-tab ${selectedTab === 'ShowCurrUserBookings' ? 'selected' : ''}`}
                    onClick={() => handleTabClick('ShowCurrUserBookings')}
                    >
                    Bookings
                </div>
                <div
                    className={`profile-favorites-tab ${selectedTab === 'FavoritesTab' ? 'selected' : ''}`}
                    onClick={() => handleTabClick('FavoritesTab')}
                >
                    Favorites
                </div>
            </div>
            <div>
                {selectedTab === 'ShowCurrUserBookings' && <ShowCurrUserBookings />}
                {selectedTab === 'FavoritesTab' && <FavoritesTab />}
            </div>
        </div>
    )
}

export default UserDash;