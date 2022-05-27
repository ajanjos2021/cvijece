import styles from "./styles.module.css";

function HeroSection({ UnesiCvijetZaPretragu }) {
  return (
    <div className={styles.heroSection}>
      <div>
        <div className={styles.text1}>Discover flowers around you</div>
        <div className={styles.text2}>
          Explore between more than 8.427 sightings
        </div>
        <input
          className={styles.input}
          placeholder=" Looking for something specific?"
          onChange={UnesiCvijetZaPretragu}
        ></input>
      </div>
    </div>
  );
}

export default HeroSection;
