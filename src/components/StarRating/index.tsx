import styles from './StarRating.module.scss'
import { CiStar } from 'react-icons/ci'

interface StarRatingProps { rating: number }

export default function StarRating({ rating }: StarRatingProps) {
  return (
    <div className={styles.popular_rate}>
      <CiStar className={styles.icon}/>
      <span className={styles.average_vote}>{(rating/2).toFixed(2)}</span>
    </div>
  )
}
