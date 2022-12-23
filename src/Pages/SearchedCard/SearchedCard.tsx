import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardSearched } from "../../Components/CardSearched/CardSearched";
import styles from "../CardSearch/cardSearch.module.scss";
import { API_URL } from "../../const/url";
import { ICard } from "../../Interfaces/interfaces";
import { Box, Spinner } from "@chakra-ui/react";

export const SearchedCard = () => {
  const [searchedCard, setSearchedCard] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  let { cardName } = useParams();

  useEffect(() => {
    async function fetchCardData() {
      await axios
        .get(API_URL + `?&fname=${cardName}`)
        .then((response) => {
          setSearchedCard(response.data.data);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => setLoading(false));
    }
    fetchCardData();
  }, [cardName]);
  return (
    <section className={styles.searchedCardSection}>
      <div className={styles.cardSearchMain}>
        {isLoading ? (
          <Box className={styles.box}>
            <Spinner className={styles.spinner} />
          </Box>
        ) : isError ? (
          <Box className={styles.box}>
            <Spinner color="red.500" className={styles.spinner} />
            <p className={styles.errorInfo}>Something wrent wrong...</p>
          </Box>
        ) : (
          searchedCard.slice(0, 1).map((card: ICard) => <CardSearched card={card} key={card.id} />)
        )}
      </div>
    </section>
  );
};
