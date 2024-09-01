import { usePopup } from 'contexts/AddListContext';
import styles from './PopupAddToList.module.scss';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useUser } from 'contexts/UserContext';
import List from './List';
import NewListPopup from './NewListPopup';

export default function PopupAddToList() {
  const [newListDisplay, setNewListDisplay] = useState(false);
  const { isOpen, closePopup, popupData } = usePopup();
  const { currentUser } = useAuth();
  const { userData } = useUser();
  const navigate = useNavigate()

  if(isOpen) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'auto';

  useEffect(() => {
    if (!currentUser && isOpen) {
      navigate('/login');
      closePopup();
    }
  }, [currentUser, navigate, closePopup, isOpen]);

  const handleClose = () => {
    closePopup();
    setNewListDisplay(false);
  }

  return (
    <div className={classNames({
      [styles.popup__container]: true,
      [styles.popup__close]: !isOpen
    })}>
      <div className={styles.popup__content}>
        <List 
          handleClose={handleClose} 
          open={!newListDisplay}
          setNewListDisplay={setNewListDisplay}
          lists={userData?.minhasListas}
          mediaId={popupData}
        />
        <NewListPopup 
          open={newListDisplay} 
          setOpen={setNewListDisplay}
          handleClose={handleClose}
        />
      </div>
    </div>
  )
}