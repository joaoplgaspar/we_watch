import React, { useState, useEffect } from 'react';
import styles from './BtnAddToFavorite.module.scss';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import classNames from 'classnames';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'contexts/UserContext';
import { updateUserFavorite } from 'services/userService';
import { IFavorite } from 'types/IUserData';
import { useMediaExtend } from 'contexts/MediaExtendContext';

interface BtnAddToFavoriteProps {
    large?: boolean;
    mediaId: number;
}

export default function BtnAddToFavorite({ large, mediaId }: BtnAddToFavoriteProps) {
    const { currentUser } = useAuth();
    const { userData, updateUserData } = useUser();
    const redirect = useNavigate();
    const [fav, setFav] = useState(false);
    const { closeMedia } = useMediaExtend();

    useEffect(() => {
        if (userData && Array.isArray(userData.favoritos)) {
            const existe = userData.favoritos.some((f: IFavorite) => f.mediaId === mediaId);
            setFav(existe);
        }
    }, [userData, mediaId]);

    const handleFav = async () => {
        if (!currentUser) {
            closeMedia();
            return redirect('/login')
        }

        const favoritos: IFavorite[] = Array.isArray(userData?.favoritos) ? userData.favoritos : [];
        const existe = favoritos.find((f) => f.mediaId === mediaId);
        let updatedFav: IFavorite[];

        if (existe) updatedFav = favoritos.filter((f) => f.mediaId !== mediaId);
        else updatedFav = [{ mediaId }, ...favoritos];

        const success = await updateUserFavorite(currentUser.uid, updatedFav);

        if (success) {
            updateUserData({
                ...userData,
                favoritos: updatedFav,
            });
            setFav(!fav);
        } else {
            alert('Erro ao atualizar favoritos');
        }
    };

    return (
        <button
            onClick={handleFav}
            className={classNames({
                [styles.btn__container]: true,
                [styles.large]: large,
            })}
        >
            {fav ? <MdFavorite /> : <MdFavoriteBorder />}
        </button>
    );
}
