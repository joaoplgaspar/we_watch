import { usePopup } from 'contexts/AddListContext';
import styles from './PopupAddToList.module.scss';
import { IoMdClose } from 'react-icons/io';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect } from 'react';


export default function PopupAddToList() {
  const { isOpen, closePopup } = usePopup();
  const { currentUser } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser && isOpen) {
      navigate('/login');
      closePopup();
    }
  }, [currentUser, navigate, closePopup, isOpen]);

  return (
    <div className={classNames({
      [styles.popup__container]: true,
      [styles.popup__close]: !isOpen
    })}>
      <div className={styles.popup__content}>
        <h3>Popup</h3>
        <div className={styles.close}>
            <IoMdClose onClick={() => closePopup()}/>
        </div>
      </div>
    </div>
  )
}
