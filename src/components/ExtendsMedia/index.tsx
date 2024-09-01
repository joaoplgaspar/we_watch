import classNames from 'classnames';
import { useMediaExtend } from 'contexts/MediaExtendContext'
import styles from './ExtendsMedia.module.scss';
import { IoMdClose } from 'react-icons/io';
import StarRating from 'components/StarRating';
import BtnAddToFavorite from 'components/BtnAddToFavorite';
import BtnAddToList from 'components/BtnAddToList';
import RateMedia from 'components/RateMedia';


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
        <img src={`https://image.tmdb.org/t/p/w400${mediaData?.poster_path}`} alt={mediaData?.title} className={styles.image}/>
        <div className={styles.popup__texts}>
          <h2 className={styles.title}>{mediaData?.title}</h2>
          <IoMdClose className={styles.close} onClick={() => closeMedia()}/>
          <StarRating rating={mediaData?.vote_average} />
          <p className={styles.description}>{mediaData?.overview}</p>
        </div> 
        <div className={styles.btns__container}>
          <BtnAddToFavorite large mediaId={mediaData?.id}/>
          <BtnAddToList large/>
        </div>
        <RateMedia mediaData={mediaData}/>
      </div>
      <div className={styles.overlay} onClick={() => closeMedia()}></div>
    </div>
  )
}
