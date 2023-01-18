import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkUpdateSpot } from "../../store/spots";

export default function UpdateSpotModal () {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    return (
        <div className='update-container'>
            <button>Update Spot</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    )
}