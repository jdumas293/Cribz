import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetSpots } from '../../store/spots';
import SpotCard from './SpotCard';
import "./SpotCard.css"


const SpotsIndex = () => {
    const dispatch = useDispatch();
    const spots = Object.values(useSelector((state) => state.spots.allSpots));

    useEffect(() => {
        dispatch(thunkGetSpots());
    }, [dispatch]);

    return (
        <>
            <div className="spot-display">
                <div className="spotCard-list">
                    {spots.map(spot => <SpotCard spot={spot} key={spot.id} />)}
                </div>
            </div>
            <div className="contact-container">
                <i className="fa-brands fa-linkedin fa-xl" onClick={() => window.open('https://www.linkedin.com/in/josephdumas16/')}></i>
                <i className="fa-brands fa-github fa-xl" onClick={() => window.open('https://github.com/jdumas293')}></i>
            </div>
        </>
    )
}

export default SpotsIndex;