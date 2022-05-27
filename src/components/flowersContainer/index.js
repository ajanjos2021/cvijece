import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../button";
import Cookies from "js-cookie";
import {
  API_FLOWERS_FAVORITES_FUNCTION,
  API_FLOWERS_SEARCH,
} from "../../constants/endpoints";

import styles from "./styles.module.css";
import FlowerCard from "../flowerCard";

function FlowersContainer({
  dostupnoCvijece,
  setDostupnoCvijece,
  prikaziJosCvijeca,
  page,
  uneseniCvijet,
}) {
  const [button, setButton] = useState(true);

  useEffect(() => {
    async function run() {
      const response = await axios.get(
        API_FLOWERS_SEARCH + "?page=" + page + "&query=" + uneseniCvijet
      );

      const pagination = response.data.meta.pagination;

      if (pagination.next_page === null) {
        setButton(false);
      }

      setDostupnoCvijece([...dostupnoCvijece, ...response.data.flowers]);
    }

    const timer = setTimeout(run, 2000);

    return () => clearTimeout(timer);
  }, [page, uneseniCvijet]);

  async function addToFavorites(idCvijeta) {
    const odg = await axios.post(
      API_FLOWERS_FAVORITES_FUNCTION(idCvijeta),
      {},
      {
        headers: {
          Authorization: Cookies.get("Authorization"),
        },
      }
    );
    if (odg.status == 200) {
      alert("Uspjesno dodan u favorite");
    }
  }

  return (
    <div>
      <div className={styles.flowerGrid}>
        {dostupnoCvijece.map((cvijet) => (
          <div key={cvijet.id}>
            <FlowerCard
              id={cvijet.id}
              profile_picture={cvijet.profile_picture}
              name={cvijet.name}
              latin_name={cvijet.latin_name}
              sightings={cvijet.sightings}
              buttonText="Add to favorites"
              onClickHandler={() => addToFavorites(cvijet.id)}
            />
          </div>
        ))}
      </div>
      {button && (
        <div className={styles.prikaziJos}>
          <Button text="Prikaži još cvijeća" onClick={prikaziJosCvijeca} />
        </div>
      )}
    </div>
  );
}

export default FlowersContainer;
