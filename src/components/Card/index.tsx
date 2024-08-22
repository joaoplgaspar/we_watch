import BtnAddToList from 'components/BtnAddToList';
import styles from './Card.module.scss';
import { IMedia } from 'types/Media';
import classNames from 'classnames';
import BtnAddToFavorite from 'components/BtnAddToFavorite';
import { useMediaExtend } from 'contexts/MediaExtendContext';

interface CardProps {
  mediaData?: IMedia
  title: IMedia["title"]
  poster_path: IMedia["poster_path"]
  overview: IMedia["overview"]
  relTop?: boolean
}

export default function Card({title, poster_path, overview, relTop, mediaData }: CardProps) {
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
  const POSTER_SIZE = 'w500';
  const { openMedia } = useMediaExtend();

  return (
    <div 
      className={classNames({
        [styles.card]: true,
        [styles.rel_top]: relTop
      })}
    >
      {poster_path && (
        <div
          className={styles.card_image__container}
        >
          <img
            src={`${BASE_IMAGE_URL}${POSTER_SIZE}${poster_path}`}
            alt={title}
            className={styles.card_image__container__image}
          />
        </div>
      )}
      <h3 className={styles.card__title}>{title}</h3>
      <div className={styles.card__hover_content}>
        <h3 className={styles.card__hover__title} onClick={() => openMedia(mediaData)}>{title}</h3>
        <p className={styles.description} onClick={() => openMedia(mediaData)}>{overview}</p>
        <div className={styles.btns}>
          <BtnAddToList />
          <BtnAddToFavorite />
        </div>
      </div>
    </div>

  )
}
