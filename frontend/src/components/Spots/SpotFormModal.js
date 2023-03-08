import { useState } from "react";
import { thunkCreateSpot } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './SpotForm.css';

export default function SpotFormModal () {
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const currentUser = useSelector(state => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        const newSpot = {
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
        
        dispatch(thunkCreateSpot(newSpot, previewImage, currentUser))
            .then((spot) => history.push(`/spots/${spot.id}`))
            .then(closeModal)
            .catch(
                async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            )
    }

    return (
        <div>
            <form className="spot-form" onSubmit={handleSubmit}>
                <div className="spot-form-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </div>
                <div className="spot-form-elements">
                    <div className="upload-address">
                        <input
                            placeholder="Your address"
                            type='text'
                            name='address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="upload-city">
                        <input
                            placeholder="Your city"
                            type='text'
                            name='city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="upload-state">
                        <input
                            placeholder="Your state"
                            type='text'
                            name='state'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </div>
                    <div className="upload-country">
                        <input
                            placeholder="Your country"
                            type='text'
                            name='country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </div>
                    <div className="upload-spot-name">
                        <input
                            placeholder="Your spot name"
                            type='text'
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="upload-description">
                        <textarea
                            placeholder="Your description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="upload-price">
                        <input
                            placeholder="Your price"
                            type='number'
                            name='price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="upload-spot-image">
                        <input
                            placeholder="Your image"
                            type='url'
                            name='previewImage'
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                            required
                        />
                    </div>
                    <button onSubmit={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    )
}