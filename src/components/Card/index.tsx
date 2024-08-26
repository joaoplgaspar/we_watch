import BtnAddToList from 'components/BtnAddToList';
import styles from './Card.module.scss';
import { IMedia } from 'types/Media';
import classNames from 'classnames';
import BtnAddToFavorite from 'components/BtnAddToFavorite';
import { useMediaExtend } from 'contexts/MediaExtendContext';

interface CardProps {
  mediaData: IMedia
  relTop?: boolean
}

export default function Card({relTop, mediaData}: CardProps) {
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
      <h3 className={styles.card__title}>{mediaData.title}</h3>
      <div className={styles.card__hover_content}>
        <h3 className={styles.card__hover__title} onClick={() => openMedia(mediaData)}>{mediaData.title}</h3>
        <p className={styles.description} onClick={() => openMedia(mediaData)}>{mediaData.overview}</p>
        <div className={styles.btns}>
          <BtnAddToList />
          <BtnAddToFavorite />
        </div>
      </div>
    </div>

  )
}
