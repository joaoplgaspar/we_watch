import { useUser } from 'contexts/UserContext';
import React, { useEffect, useState } from 'react'
import styles from '../Header.module.scss'
import { Link } from 'react-router-dom';
import { IoMdLogIn } from 'react-icons/io';
import { MdAccountCircle } from 'react-icons/md';

export default function ProfileAccess() {
    const { userData, loading } = useUser();
    const [avatar, setAvatar] = useState<string>('');

    useEffect(() => {
        setAvatar(userData?.avatar || '');
    }, [userData]);

    return (
        userData ? (
            <div className={styles.profile}>
                <Link to="/account" className={styles.nav_item}>
                    {loading ? <MdAccountCircle size={35}/> : <img src={`assets/images/avatar/${avatar}`} alt="Avatar da conta"/>}
                </Link>
            </div>
        ) : (
            <div className={styles.profile}>
                <Link to="/login" className={styles.nav_item}>
                    <IoMdLogIn className={styles.icon_login}/>
                </Link>
            </div>
        )
    )
}
