import styles from './Card.module.scss';
import { IMedia } from 'types/Media';

export default function Card({title, poster_path}: IMedia) {
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
  const POSTER_SIZE = 'w500';

  return (
    <div className={styles.card}>
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
    </div>

  )
}
