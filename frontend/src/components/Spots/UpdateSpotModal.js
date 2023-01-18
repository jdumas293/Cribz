import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkUpdateSpot } from "../../store/spots";

export default function UpdateSpotModal () {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleUpdate = async (e) => {
        e.preventDefault();

        dispatch(thunkUpdateSpot());
        closeModal();
        history.push('/');
    }

    return (
        <div className='update-container'>
            <button onClick={handleUpdate}>Update Spot</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    )
}