import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetSpotDetails } from '../../store/spots';
import SpotDetailsCard from './SpotDetailsCard';

export default function SpotDetails () {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spotObj = useSelector(state => state.spots);
    const singleSpot = Object.values(spotObj);
    // console.log('spot', spot);
    
    useEffect(() => {
        dispatch(thunkGetSpotDetails(spotId));
    }, [dispatch, spotId]);

    return (
        <div>
            {singleSpot.map(spot => <SpotDetailsCard spot={spot} key={spot.id} />)}
        </div>
    )
}