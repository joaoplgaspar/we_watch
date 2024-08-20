import { useEffect, useState } from 'react';
import styles from './Header.module.scss'
import { MdMovie } from "react-icons/md";
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { useUser } from 'contexts/UserContext';


export default function Header() {
  const { userData, loading } = useUser();

  const [headerHidden, setHeaderHidden] = useState<boolean>(false);
  const [headerBlur, setHeaderBlur] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | null>('');
  let initialScroll = window.scrollY;

  useEffect(() => {
    setAvatar(userData?.avatar || '');
  }, [userData]);

  window.addEventListener('scroll', () => {
    setHeaderBlur(window.scrollY > 0);
    if (window.scrollY > initialScroll && window.scrollY > 200) {
      setHeaderHidden(true);
    } else {
      setHeaderHidden(false);
    }
    initialScroll = window.scrollY;
  });

  const accountIcon = () => {
    if (userData) {
      return (
        <li>
          <Link to="/account" className={styles.nav_item}>
            {loading ? <MdAccountCircle size={35}/> : <img src={`assets/images/avatar/${avatar}`} alt="Avatar da conta"/>}
          </Link>
        </li>
      )
    } else {
      return (
        <li>
          <Link to="/login" className={styles.nav_item}>
            <IoMdLogIn size={35}/>
          </Link>
        </li>
      )
    }
  }

  return (
    <header className={
      classNames({
        [styles.header]: true,
        [styles.header__hidden]: headerHidden,
        [styles.header__blur]: headerBlur
      })}
    >
      <div className={styles.header__content}>
        <h1 className={styles.header__content__title}>
          <MdMovie />
          <Link to="/" className={styles.header__content__title}>
            We Watch
          </Link>
        </h1>
        <nav className={styles.header__content__nav}>
          <ul className={styles.nav_list}>
            {accountIcon()}
          </ul>
        </nav>
      </div>
    </header>
  )
}
