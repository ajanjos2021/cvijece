import { useState } from "react";
import Header from "../../components/header";
import FlowersContainer from "../../components/flowersContainer";
import HeroSection from "../../components/heroSection";

function HomePage() {
  const [uneseniCvijet, setUneseniCvijet] = useState("");

  const [dostupnoCvijece, setDostupnoCvijece] = useState([]);

  const [page, setPage] = useState(1);

  function UnesiCvijetZaPretragu(event) {
    setUneseniCvijet(event.target.value);
    setPage(1);
    setDostupnoCvijece([]);
  }

  function prikaziJosCvijeca() {
    setPage(page + 1);
  }

  return (
    <div>
      <Header />
      <HeroSection UnesiCvijetZaPretragu={UnesiCvijetZaPretragu} />
      <FlowersContainer
        uneseniCvijet={uneseniCvijet}
        dostupnoCvijece={dostupnoCvijece}
        setDostupnoCvijece={setDostupnoCvijece}
        prikaziJosCvijeca={prikaziJosCvijeca}
        page={page}
      />
    </div>
  );
}

export default HomePage;
