import { usePopup } from 'contexts/AddListContext';
import styles from './PopupAddToList.module.scss';
import { IoMdClose } from 'react-icons/io';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function PopupAddToList() {
  const { isOpen, popupData, closePopup } = usePopup();
  const { currentUser } = useAuth();
  const navigate = useNavigate()

  if (!isOpen) return null;

  if(!currentUser) {
    navigate('/login')
    closePopup()
  }

  return (
    <div className={styles.popup__container}>
      <div className={styles.popup__content}>
        <h3>Popup</h3>
        <div className={styles.close}>
            <IoMdClose onClick={() => closePopup()}/>
        </div>
      </div>
    </div>
  )
}
