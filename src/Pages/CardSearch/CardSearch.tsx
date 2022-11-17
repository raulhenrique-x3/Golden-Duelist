import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ICard } from "../../Interfaces/interfaces";
import { API_URL, STAPLES_API_URL } from "../../const/url";
import axios from "axios";
import styles from "./cardSearch.module.scss";
import { CardsSearcheds } from "../../Components/CardsSearcheds/CardsSearcheds";
import { Box, Spinner } from "@chakra-ui/react";

export const CardSearch = () => {
  const [searchedCard, setSearchedCard] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError] = useState(false);
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
  }, [cardName]);
  return (
    <main className={styles.cardSearchMain}>
      {isLoading ? (
        <Box className={styles.box}>
          <Spinner
            className={styles.spinner}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      ) : isError ? (
        <Box className={styles.box}>
          <Spinner color="red.500" className={styles.spinner} />
          <p className={styles.errorInfo}>Something wrent wrong...</p>
        </Box>
      ) : (
        <div className={styles.cardsContainer}>
          {searchedCard?.slice(0, 15).map((card: ICard) => (
            <CardsSearcheds card={card} key={card?.id} />
          ))}
        </div>
      )}
    </main>
  );
};
