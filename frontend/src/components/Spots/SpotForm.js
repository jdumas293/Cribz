import { useState } from "react";
import { thunkCreateSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './SpotForm.css';

export default function SpotForm () {
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }
        dispatch(thunkCreateSpot(newSpot));
        history.push('/');
    }

    return (
        <div>
            <form
                className="spot-form"
                onSubmit={handleSubmit}
                >
                <h1>List a Spot:</h1>
                <label>
                    Address:
                    <br />
                    <input
                        type='text'
                        name='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <label>
                    City:
                    <br />
                    <input
                        type='text'
                        name='city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                <label>
                    State:
                    <br />
                    <input
                        type='text'
                        name='state'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
                <label>
                    Country:
                    <br />
                    <input
                        type='text'
                        name='country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                <label>
                    Latitude:
                    <br />
                    <input
                        type='number'
                        step='any'
                        name='lat'
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </label>
                <label>
                    Longitude:
                    <br />
                    <input
                        type='number'
                        step='any'
                        name='lng'
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                    />
                </label>
                <label>
                    Name:
                    <br />
                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Description:
                    <br />
                    <textArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Price:
                    <br />
                    <input
                        type='number'
                        name='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                <br />
                <button onSubmit={handleSubmit}>Submit</button>
                <br />
            </form>
        </div>
    )
}