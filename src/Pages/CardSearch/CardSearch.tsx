import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardProducts } from "../../Components/CardProducts/CardProducts";
import { ICard } from "../../Interfaces/interfaces";
import { API_URL, STAPLES_API_URL } from "../../const/url";
import axios from "axios";
import styles from "./cardSearch.module.scss";
import { CardSearched } from "../../Components/CardSearched/CardSearched";

export const CardSearch = () => {
  const [searchedCard, setSearchedCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  let { cardName } = useParams();
  console.log(cardName);

  useEffect(() => {
    async function fetchCardData() {
      await axios
        .get(API_URL + `?&fname=${cardName}`)
        .then((response) => {
          setSearchedCard(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setLoading(false));
    }

    if (cardName === undefined) {
      axios
        .get(STAPLES_API_URL)
        .then((response) => {
          setSearchedCard(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setLoading(false));
    }

    fetchCardData();
  }, []);
  return (
    <main className={styles.cardSearchMain}>
      <div className={styles.cardsContainer}>
        {searchedCard?.map((card: ICard) => (
          <CardProducts card={card} key={card?.id} />
        ))}
      </div>
    </main>
  );
};
