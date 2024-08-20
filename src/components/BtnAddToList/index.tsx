import { usePopup } from 'contexts/AddListContext';
import React from 'react'

export default function BtnAddToList() {
    const { openPopup } = usePopup();

    const handleClick = () => {
        const newData = { message: 'Novas informações' };
        openPopup(newData);
    };

    return (
        <button onClick={handleClick}>
            AddToCard
        </button>
    )
}
