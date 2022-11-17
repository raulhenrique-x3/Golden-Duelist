import styles from "./cardSearched.module.scss";
import { Box, Button, Skeleton } from "@chakra-ui/react";
import { useGetAllStaplesQuery } from "../../Redux/Features/productsAPI";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Features/cartSlice";
import { ICard } from "../../Interfaces/interfaces";
import { Link } from "react-router-dom";
import { BsFillCartFill, BsFillHeartFill } from "react-icons/bs";
import { addToFavorite } from "../../Redux/Features/favoriteSlice";

interface ICardProducts {
  card: ICard;
}

export const CardSearched: React.FC<ICardProducts> = ({ card }) => {
  const { isError, isLoading } = useGetAllStaplesQuery([]);
  const dispatch = useDispatch();
  const handleAddToCart = (card: ICard) => {
    dispatch(addToCart(card));
  };

  const handleAddToFavorite = (card: ICard) => {
    dispatch(addToFavorite(card));
  };

  return (
    <div className={styles.mostWantedCards} key={card.id}>
      {isLoading ? (
        <Box>
          <Skeleton width={100} height={40} />
        </Box>
      ) : isError ? (
        <Box>
          <Skeleton width={100} height={40} />
        </Box>
      ) : (
        <figure className={styles.cardFigure}>
          <img className={styles.productImage} src={card.card_images[0].image_url} alt={card.name} />

          <figcaption className={styles.figCaptionInfos}>
            <Link to={`/searchedCard/${card?.name}`}>
              <h2 className={styles.productName}>{card?.name}</h2>
            </Link>
            <p>{card?.desc}</p>
            <p className={styles.productName}>Card Price: $ {card.card_prices[0].cardmarket_price}</p>
            <div className={styles.userButtons}>
              <Button colorScheme="green" size="sm" onClick={() => handleAddToCart(card)}>
                <BsFillCartFill className={styles.BsFillCart} />
              </Button>
              <Button colorScheme="red" size="sm" onClick={() => handleAddToFavorite(card)}>
                <BsFillHeartFill className={styles.BsFillCart} />
              </Button>
            </div>
          </figcaption>
        </figure>
      )}
    </div>
  );
};
