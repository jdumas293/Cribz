import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkDeleteSpot } from "../../store/spots";
import './DeleteSpot.css'

export default function DeleteSpotModal ({ spotId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    
    const handleDelete = async (e) => {
        e.preventDefault();

        dispatch(thunkDeleteSpot(spotId));
        closeModal();
        history.push('/');
    }

    return (
        <div className='delete-container'>
            <h3>Are you sure you want to delete this spot?</h3>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    )
}