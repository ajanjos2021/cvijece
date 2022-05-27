import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header";
import { API_FLOWERS } from "../../constants/endpoints";

import styles from "./styles.module.css";

function FlowersDetailPage() {
  let params = useParams();

  const [cvijece, setCvijece] = useState({});

  useEffect(() => {
    async function run() {
      const response = await axios.get(API_FLOWERS + params.id);
      setCvijece(response.data.flower);
    }
    run();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div>
          <img
            src={cvijece.profile_picture}
            alt="flower picture"
            className={styles.image}
          />
        </div>
        <div>
          <div className={styles.name}>{cvijece.name}</div>
          <div className={styles.latinName}>{cvijece.latin_name}</div>
          <div className={styles.description}>{cvijece.description}</div>
          <div>
            {cvijece?.features?.map((el) => (
              <div key={el}>{el}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FlowersDetailPage;
