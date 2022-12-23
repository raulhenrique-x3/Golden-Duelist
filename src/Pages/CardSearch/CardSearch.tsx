import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ICard } from "../../Interfaces/interfaces";
import { API_URL, STAPLES_API_URL } from "../../const/url";
import axios from "axios";
import styles from "./cardSearch.module.scss";
import { Box, Button, Spinner } from "@chakra-ui/react";
import { CardContainer } from "../../Components/CardContainer/CardContainer";
import { Card } from "../../Components/CardBox/Card";
import { useDispatch } from "react-redux";
import { addToFavorite } from "../../Redux/Features/favoriteSlice";
import { addToCart } from "../../Redux/Features/cartSlice";
import { BsFillCartFill, BsFillHeartFill } from "react-icons/bs";

export const CardSearch = () => {
  const [searchedCard, setSearchedCard] = useState([]);
  const [loadMoreCards, setLoadMoreCards] = useState(16);
  const [isLoading, setLoading] = useState(true);
  const [isError] = useState(false);
  let { cardName } = useParams();
  const dispatch = useDispatch();
  const handleAddToCart = (card: ICard) => {
    dispatch(addToCart(card));
  };
  const handleAddToFavorite = (card: ICard) => {
    dispatch(addToFavorite(card));
  };

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
    <section className={styles.searchedCardSection}>
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
          <CardContainer>
            {searchedCard?.slice(0, loadMoreCards).map((card: ICard) => (
              <Card alt={card?.name} card_images={card?.card_images[0]?.image_url} key={card?.id}>
                <Link to={`/searchedCard/${card?.name}`}>
                  {card?.name?.length > 20 ? (
                    <p className={styles.cardName}>{card?.name?.slice(0, 15)}...</p>
                  ) : (
                    <p className={styles.cardName}>{card?.name}</p>
                  )}
                </Link>
                <div className={styles.userButtons}>
                  <Button colorScheme="green" size="xs" onClick={() => handleAddToCart(card)}>
                    <BsFillCartFill />
                  </Button>
                  <Button colorScheme="red" size="xs" onClick={() => handleAddToFavorite(card)}>
                    <BsFillHeartFill />
                  </Button>
                </div>
              </Card>
            ))}
            {loadMoreCards <= searchedCard.length ? (
              <Button colorScheme="blue" variant="solid" onClick={() => setLoadMoreCards(loadMoreCards + 8)}>
                Carregar mais...
              </Button>
            ) : (
              <Button colorScheme="blue" variant="outline" onClick={() => setLoadMoreCards(15)}>
                Mostra menos...
              </Button>
            )}
          </CardContainer>
        )}
      </main>
    </section>
  );
};
