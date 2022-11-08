import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardProducts } from "../../Components/CardProducts/CardProducts";
import { ICard } from "../../Interfaces/interfaces";
import styles from "./cardSearch.module.scss";
import { API_URL } from "../../const/url";
import axios from "axios";

export const CardSearch = () => {
  const [searchedCard, setSearchedCard] = useState([]);
  let { cardName } = useParams();
  useEffect(() => {
    axios
      .get(API_URL + `?&fname=${cardName}`)
      .then((response) => {
        setSearchedCard(response.data.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, [cardName]);
  console.log(cardName);
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
