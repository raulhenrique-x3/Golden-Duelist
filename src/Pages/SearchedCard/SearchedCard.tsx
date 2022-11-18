import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardSearched } from "../../Components/CardSearched/CardSearched";
import styles from "../CardSearch/cardSearch.module.scss";
import { API_URL } from "../../const/url";
import { ICard } from "../../Interfaces/interfaces";

export const SearchedCard = () => {
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
    fetchCardData();
  }, []);
  return (
    <div className={styles.cardSearchMain}>
      {searchedCard.map((card: ICard) => (
        <CardSearched card={card} key={card.id} />
      ))}
    </div>
  );
};
