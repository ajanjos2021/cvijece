import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  API_FLOWERS_FAVORITES_FUNCTION,
  API_USER_FLOWER_FAVORITES,
} from "../../constants/endpoints";
import Header from "../../components/header";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";
import FlowerCard from "../../components/flowerCard";

function FavoritesPage() {
  let navigate = useNavigate();
  const { appUser } = useContext(AuthContext);

  const [favFlowers, setFavFlowers] = useState([]);

  const [page, setPage] = useState(1);

  const [buttonZaPrikazivanjeJosCvijeca, setButtonZaPrikazivanjeJosCvijeca] =
    useState(true);

  function povecajStranicu() {
    setPage(page + 1);
  }

  useEffect(() => {
    if (!appUser) {
      navigate("/error");
    }
  }, []);

  useEffect(() => {
    async function run() {
      const response = await axios.get(
        API_USER_FLOWER_FAVORITES + "?page=" + page,
        {
          headers: {
            Authorization: Cookies.get("Authorization"),
          },
        }
      );

      const pagination = response.data.meta.pagination;

      if (pagination.next_page === null) {
        setButtonZaPrikazivanjeJosCvijeca(false);
      }

      setFavFlowers([...favFlowers, ...response.data.fav_flowers]);
    }
    run();
  }, [page]);

  async function removeFromFavorites(flowerId, idZapisaUBazi) {
    const response = await axios.delete(
      API_FLOWERS_FAVORITES_FUNCTION(flowerId) + idZapisaUBazi,
      {
        headers: {
          Authorization: Cookies.get("Authorization"),
        },
      }
    );

    if (response.status === 200) {
      const newFavFlowers = favFlowers.filter((el) => {
        if (el.id === idZapisaUBazi) return false;
        return true;
      });
      setFavFlowers(newFavFlowers);
    }
  }

  return (
    <div>
      <Header />
      <div className={styles.flowerGrid}>
        {favFlowers.map((el) => (
          <FlowerCard
            key={el.flower.id}
            id={el.flower.id}
            profile_picture={el.flower.profile_picture}
            name={el.flower.name}
            latin_name={el.flower.latin_name}
            sightings={el.flower.sightings}
            buttonText="Remove from favorites"
            onClickHandler={() => removeFromFavorites(el.flower.id, el.id)}
          />
        ))}
      </div>
      {buttonZaPrikazivanjeJosCvijeca && (
        <button onClick={povecajStranicu}>Prikaz više cvijeća</button>
      )}
    </div>
  );
}

export default FavoritesPage;
