import styles from "./eventBanner.module.css";

export const EventBanner = () => {
  return (
    <article
      className={styles.banner}
      style={{
        backgroundImage: "url(/베너사진/MAIN-BANNER-01.png",
        backgroundSize: "100%",
      }}
    >
      <div className={styles.left}>
        <img src="images/icon-swiper-1.svg" alt="left" />
      </div>
    </article>
  );
};
