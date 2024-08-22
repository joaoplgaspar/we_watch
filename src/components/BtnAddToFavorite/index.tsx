import React, { useState } from 'react'
import styles from './BtnAddToFavorite.module.scss'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

export default function BtnAddToFavorite() {
    const [fav, setFav] = useState(false);

    return (
        <button onClick={() => setFav(!fav)} className={styles.btn__container}>
            {fav ? <MdFavorite /> : <MdFavoriteBorder />}
        </button>
    )
}
