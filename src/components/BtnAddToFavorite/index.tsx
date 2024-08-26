import React, { useState } from 'react'
import styles from './BtnAddToFavorite.module.scss'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import classNames from 'classnames';

interface BtnAddToFavoriteProps {
    large?: boolean;
}

export default function BtnAddToFavorite({large}: BtnAddToFavoriteProps) {
    const [fav, setFav] = useState(false);

    return (
        <button onClick={() => setFav(!fav)} className={classNames({
            [styles.btn__container]: true,
            [styles.large]: large
        })}>
            {fav ? <MdFavorite /> : <MdFavoriteBorder />}
        </button>
    )
}
