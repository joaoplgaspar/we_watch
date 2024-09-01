import { IBanner } from 'types/IComponents';
import styles from './Banner.module.scss';
import LinkButton from 'components/LinkButton';
import { useState } from 'react';

export default function Banner({ type, local, src, alt, title, description, button }: IBanner) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  function bannerMedia() {
    if (type === 'image') {
      const srcBanner = local ? `assets/images/banners/${src}` : src;
      return <img src={srcBanner} alt={alt} className={styles.banner_image} onLoadedData={() => setVideoLoaded(true)}/>;
    } else {
      const srcBanner = local ? `assets/videos/${src}` : src;
      return (
        <video
          src={srcBanner}
          muted
          loop
          autoPlay
          className={`${styles.banner_video} ${videoLoaded ? styles.loaded : ''}`}
          onLoadedData={() => setVideoLoaded(true)}
        ></video>
      );
    }
  }

  return (
    <section className={styles.banner__container}>
      <div className={styles.banner__content}>
        <h1 className={styles.title}>{title}</h1>
        <p dangerouslySetInnerHTML={{ __html: description }} />
        <div className={styles.btns__container}>
          {button.map((btn, index) => (
            <LinkButton key={index} to={btn.link}>
              {btn.text}
            </LinkButton>
          ))}
        </div>
      </div>
      {bannerMedia()}
      <div className={styles.overlay}></div>
    </section>
  );
}
