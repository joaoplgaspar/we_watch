import { usePopup } from 'contexts/AddListContext';
import React from 'react'
import { IoAddSharp } from "react-icons/io5";
import styles from './BtnAddToList.module.scss'
import classNames from 'classnames';

export default function BtnAddToList() {
    const { openPopup } = usePopup();

    const handleClick = () => {
        const newData = { message: 'Novas informações' };
        openPopup(newData);
    };

    return (
        <button 
            onClick={handleClick}
            className={classNames({
                [styles.btn__container]: true
            })}
        >
            <IoAddSharp />
        </button>
    )
}
