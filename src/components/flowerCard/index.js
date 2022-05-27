import { Link } from "react-router-dom";
import Button from "../button";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import styles from "./styles.module.css";

const FlowerCard = ({
  id,
  name,
  profile_picture,
  latin_name,
  sightings,
  buttonText,
  onClickHandler,
}) => {
  const { appUser } = useContext(AuthContext);

  return (
    <div className={styles.card}>
      <Link to={"/flower/" + id}>
        <img
          src={profile_picture}
          alt="slikaCvijeta"
          className={styles.image}
        />
        <div className={styles.about}>
          <div>{name}</div>
          <div>{latin_name}</div>
          <div className={styles.sightings}>{sightings} sightings</div>
        </div>
      </Link>
      {appUser && (
        <div className={styles.button}>
          <Button text={buttonText} onClick={onClickHandler} />
        </div>
      )}
    </div>
  );
};

export default FlowerCard;
