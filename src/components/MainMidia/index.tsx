import { IMediaCredits, IMediaDetails, IMediaProviders } from 'types/IMedia'
import styles from './MainMidia.module.scss'
import WatchProviders from 'components/WatchProviders';

interface MainMidiaProps {
    title: IMediaDetails['title'];
    tagline: IMediaDetails['tagline'];
    overview: IMediaDetails['overview'];
    poster_path: IMediaDetails['poster_path'];
    release_date: IMediaDetails['release_date'];
    directors: IMediaCredits['crew'];
    providers: IMediaProviders['results'] | undefined;
}

export default function MainMidia({ title, tagline, overview, poster_path, release_date, directors, providers }: MainMidiaProps) {
  return (
    <section className={styles.container}>
        <div className={styles.content}>
            <div className={styles.info}>
                <h1 className={styles.title}>{title}</h1>
                <span className={styles.release_date}>({release_date?.slice(0, 4)})</span>
                <p className={styles.tagline}>{tagline}</p>
                <div className={styles.directors}>
                    <p className={styles.directors_title}>{directors && directors.length > 1 ? 'Diretores: ' : 'Diretor: '}</p>
                    {directors?.map(director => (
                        <span key={director.credit_id}>{director.name}</span>
                    ))}
                </div>
            </div>
            <div className={styles.poster}>
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
            </div>
            <div className={styles.overview}>
                <h2 className={styles.overview_title}>Overview</h2>
                <p className={styles.overview_text}>{overview}</p>
            </div>
            <div className={styles.providers__container}>
                <WatchProviders results={providers} />
            </div>
        </div>
    </section>
  )
}
