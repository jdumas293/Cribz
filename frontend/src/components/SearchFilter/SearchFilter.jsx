import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSpots } from "../../store/spots";
import "./SearchFilter.css";

const SearchFilter = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

    const spots = Object.values(useSelector(state => state.spots.allSpots));

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const onSearch = (searchTerm) => {
        setValue(searchTerm);
    };

    useEffect(() => {
        dispatch(thunkGetSpots());
    }, [dispatch])

    return (
        <div className="search-container">
            <div className="search-inner">
                <input
                    type="text"
                    placeholder="Search by city..."
                    value={value}
                    onChange={onChange}
                />
                <button onClick={() => onSearch(value)}>Search</button>
            </div>
            <div className="dropdown">
                {spots.filter(spot => {
                    const searchTerm = value.toLowerCase();
                    // const name = spot.name.toLowerCase();
                    const city = spot.city.toLowerCase();

                    return searchTerm && city.startsWith(searchTerm) && city !== searchTerm;
                })
                .map((spot) => <div onClick={() => onSearch(spot.city)} className="dropdown-row">
                    {spot.city}    
                </div>)}
            </div>
        </div>
    )
}

export default SearchFilter;