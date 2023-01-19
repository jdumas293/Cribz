import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkUpdateSpot } from "../../store/spots";
import './UpdateSpot.css';

export default function UpdateSpotModal ({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // console.log('price', price)

    const handleUpdate = (e) => {
        e.preventDefault();
        setErrors([]);

        const updateSpot = {
            ...spot,
            address,
            city,
            state,
            country,
            lat: 40.7128,
            lng: 74.0060,
            name,
            description,
            price
        };

        dispatch(thunkUpdateSpot(updateSpot))
            .then(closeModal)
            .catch(
                async(res) => {
                    console.log('res', res);
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
        history.push(`/spots/${spot.id}`); // redirect to spot details page after update
    }

    return (
        <div>
            <form
                className="update-form"
                onSubmit={handleUpdate}
                >
                <h1>Edit Spot</h1>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
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
                    <textarea
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
                <button onSubmit={handleUpdate}>Submit</button>
                <br />
            </form>
        </div>
    )
}