import styles from './MidiaBanner.module.scss'

interface MidiaBannerProps {
    bannerSrc: string | undefined;
}

export default function MidiaBanner({ bannerSrc }: MidiaBannerProps) {
    return (
        <section className={styles.banner}>
            <img src={`https://image.tmdb.org/t/p/original${bannerSrc}`} alt="Banner" />
        </section>
    )
}
