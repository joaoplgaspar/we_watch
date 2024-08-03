import styles from './Banner.module.scss'

export default function Banner() {
  return (
    <section className={styles.banner__container}>
        <div className={styles.banner__content}>
          <h1 className={styles.title}>We Watch!</h1>
          <p>Descubra a nova maneira de aproveitar seus <strong>filmes e séries favoritos</strong> com We Watch! <strong>Crie listas compartilhadas com amigos</strong>, conecte-se com outra pessoa para <strong>montar uma seleção de filmes imperdíveis</strong> e encontre o <strong>match</strong> perfeito para assistir juntos.</p>
        </div>
        <video src="assets/videos/miles_and_gwen.mp4" autoPlay muted loop className={styles.banner_video}></video>
        <div className={styles.overlay}></div>
    </section>
  )
}
