import classNames from 'classnames';
import { useMediaExtend } from 'contexts/MediaExtendContext'
import styles from './ExtendsMedia.module.scss';
import { IoMdClose } from 'react-icons/io';


export default function ExtendsMedia() {
  const { isOpen, closeMedia, mediaData } = useMediaExtend();

  if(isOpen) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'auto';

  return (
    <div className={classNames({
      [styles.popup__container]: true,
      [styles.popup__close]: !isOpen
    })}>
      <div className={styles.popup__content}>
        <h2>
          {mediaData?.title}
        </h2>
      </div>
      <div className={styles.overlay} onClick={() => closeMedia()}></div>
    </div>
  )
}
