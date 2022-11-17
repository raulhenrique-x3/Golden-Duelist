import { Box, Button, Spinner } from "@chakra-ui/react";
import styles from "../../Pages/MainPage/mainPage.module.scss";
import { useGetAllStaplesQuery } from "../../Redux/Features/productsAPI";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Features/cartSlice";
import { ICard } from "../../Interfaces/interfaces";
import { Link } from "react-router-dom";

interface ICardProducts {
  card: ICard;
}

export const CardProducts: React.FC<ICardProducts> = ({ card }) => {
  const { isError, isLoading } = useGetAllStaplesQuery([]);
  const dispatch = useDispatch();
  const handleAddToCart = (card: ICard) => {
    dispatch(addToCart(card));
  };

  return (
    <div className={styles.mostWantedCards} key={card.id}>
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
        <>
          <Link to={`/searchedCard/${card?.name}`}>
            <img className={styles.productImage} src={card.card_images[0].image_url} alt={card.name} />
          </Link>

          <Link to={`/searchedCard/${card?.name}`}>
            <p className={styles.productName}>{card?.name}</p>
          </Link>

          <p className={styles.productPrice}>$ {card.card_prices[0].cardmarket_price}</p>
          <Button colorScheme="green" size="sm" onClick={() => handleAddToCart(card)}>
            Comprar
          </Button>
        </>
      )}
    </div>
  );
};
