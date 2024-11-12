import BtnAddToList from 'components/BtnAddToList';
import styles from './Card.module.scss';
import { IMedia } from 'types/IMedia';
import classNames from 'classnames';
import BtnAddToFavorite from 'components/BtnAddToFavorite';
import { useMediaExtend } from 'contexts/MediaExtendContext';
import { Link } from 'react-router-dom';

interface CardProps {
  mediaData: IMedia
  relTop?: boolean,
  type: string
}

export default function Card({relTop, mediaData, type}: CardProps) {
  const { openMedia } = useMediaExtend();
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
  const POSTER_SIZE = 'w500';

  return (
    <div 
      className={classNames({
        [styles.card]: true,
        [styles.rel_top]: relTop
      })}
    >
      {mediaData.poster_path && (
        <div
          className={styles.card_image__container}
        >
          <img
            src={`${BASE_IMAGE_URL}${POSTER_SIZE}${mediaData.poster_path}`}
            alt={mediaData.title}
            className={styles.card_image__container__image}
            onClick={() => openMedia(mediaData)}
          />
        </div>
      )}
      <div className={styles.card__hover_content}>
        <h3 className={styles.card__hover__title}>
          <Link to={`/${type}/${mediaData.id}`}>
            {mediaData.title}
          </Link>
        </h3>
        <p className={styles.description} onClick={() => openMedia(mediaData)}>{mediaData.overview}</p>
        <div className={styles.btns}>
          <BtnAddToList mediaId={mediaData.id}/>
          <BtnAddToFavorite mediaId={mediaData.id}/>
        </div>
      </div>
    </div>

  )
}
