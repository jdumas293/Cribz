import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetSpots } from '../../store/spots';
import SpotCard from './SpotCard';
import "./SpotCard.css"


const SpotsIndex = () => {
    const dispatch = useDispatch();
    const spots = Object.values(useSelector((state) => state.spots));
    // console.log('spots', spots);

    useEffect(() => {
        dispatch(thunkGetSpots());
    }, [dispatch]);

    return (
        <div className="spot-display">
            <div className="spotCard-list">
                {spots.map(spot => <SpotCard spot={spot} key={spot.id} />)}
            </div>
        </div>
    )
}

export default SpotsIndex;