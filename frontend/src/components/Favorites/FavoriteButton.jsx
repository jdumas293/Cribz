import React, { useState } from 'react';

const FavoriteButton = () => {
    // const [favorite, setFavorite] = useState(100);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <button onClick={handleClick}>
            {isClicked ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}
        </button>
    )
}

export default FavoriteButton;