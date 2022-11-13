import styles from "./cardsSearcheds.module.scss";
import { Box, Button, Skeleton } from "@chakra-ui/react";
import { useGetAllStaplesQuery } from "../../Redux/Features/productsAPI";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Features/cartSlice";
import { ICard } from "../../Interfaces/interfaces";
import { Link } from "react-router-dom";
import { BsFillCartFill, BsFillHeartFill } from "react-icons/bs";

interface ICardProducts {
  card: ICard;
}

export const CardsSearcheds: React.FC<ICardProducts> = ({ card }) => {
  const { isError, isLoading } = useGetAllStaplesQuery([]);
  const dispatch = useDispatch();
  const handleAddToCart = (card: ICard) => {
    dispatch(addToCart(card));
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
        <figure className={styles.cardsSearcheds}>
          <Link to={`/searchedCard/${card?.name}`}>
            <img className={styles.cardsSearchedsImage} src={card.card_images[0].image_url} alt={card.name} />
          </Link>

          <figcaption className={styles.cardsSearchedsfigCaption}>
            <Link to={`/searchedCard/${card?.name}`}>
              <h2 className={styles.cardsSearchedsName}>{card?.name}</h2>
            </Link>
            <p className={styles.cardsSearchedsDesc}>{card?.desc}</p>
            <p className={styles.cardsSearchedsPrice}>$ {card.card_prices[0].cardmarket_price}</p>
            <div className={styles.cardsSearchedsButtons}>
              <Button colorScheme="green" size="sm" onClick={() => handleAddToCart(card)}>
                <BsFillCartFill className={styles.BsFillCart} />
              </Button>
              <Button colorScheme="red" size="sm" onClick={() => handleAddToCart(card)}>
                <BsFillHeartFill className={styles.BsFillCart} />
              </Button>
            </div>
          </figcaption>
        </figure>
      )}
    </div>
  );
};
