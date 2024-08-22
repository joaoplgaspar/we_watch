import { IBanner } from 'types/Components';
import styles from './Banner.module.scss';
import LinkButton from 'components/LinkButton';

export default function Banner({ type, local, src, alt, title, description, button }: IBanner) {

  function bannerMedia() {
    if (type === 'image') {
      const srcBanner = local ? `assets/images/banners/${src}` : src;
      return <img src={srcBanner} alt={alt} className={styles.banner_image} />;
    } else {
      const srcBanner = local ? `assets/videos/${src}` : src;
      return (
        <video
          src={srcBanner}
          muted
          loop
          autoPlay
          className={styles.banner_video}
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
