import { useEffect, useRef } from 'react';
import { IBanner } from 'types/Components';
import styles from './Banner.module.scss';

export default function Banner({ type, local, src, alt }: IBanner) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let debounceTimeout: NodeJS.Timeout;
    const ref = videoRef.current

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      debounceTimeout = setTimeout(() => {
        entries.forEach((entry) => {
          if (ref) {
            if (entry.isIntersecting) {
              ref.play().catch((error) => {
                console.error("Error attempting to play video:", error);
              });
            } else {
              ref.pause();
            }
          }
        });
      }, 100);
    };

    if (ref) {
      observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
      observer.observe(ref);
    }

    return () => {
      if (observer && ref) observer.unobserve(ref);
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, []);

  function bannerMedia() {
    if (type === 'image') {
      const srcBanner = local ? `assets/images/banners/${src}` : src;
      return <img src={srcBanner} alt={alt} className={styles.banner_image} />;
    } else {
      const srcBanner = local ? `assets/videos/${src}` : src;
      return (
        <video
          ref={videoRef}
          src={srcBanner}
          muted
          loop
          className={styles.banner_video}
        ></video>
      );
    }
  }

  return (
    <section className={styles.banner__container}>
      <div className={styles.banner__content}>
        <h1 className={styles.title}>We Watch!</h1>
        <p>
          Descubra a nova maneira de aproveitar seus
          <strong>filmes e séries favoritos</strong> com We Watch! <strong>Crie listas compartilhadas com amigos</strong>, conecte-se com outra  pessoa para <strong>montar uma seleção de filmes imperdíveis</strong> e encontre o <strong>match</strong> perfeito para assistir juntos.
        </p>
      </div>
      {bannerMedia()}
      <div className={styles.overlay}></div>
    </section>
  );
}
