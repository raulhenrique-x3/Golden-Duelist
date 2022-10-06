import { Box, Button, Skeleton, Spinner } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import styles from "../Products/products.module.scss";
import { useGetAllStaplesQuery } from "../../Redux/Features/productsAPI";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Features/cartSlice";
import { ICard } from "../../Interfaces/interfaces";

interface ICardProducts {
  card: ICard;
  cartItems?: ICard;
}

export const CardProducts: React.FC<ICardProducts> = ({ card }) => {
  const { isError, isLoading } = useGetAllStaplesQuery("");
  const cartItems = useSelector((state: ICardProducts) => state.card);
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
        <>
          <img className={styles.productImage} src={card.card_images[0].image_url} alt={card.name} />
          <Marquee gradient={false} speed={5} className={styles.productName}>
            {card?.name}
          </Marquee>
          <p className={styles.productPrice}>$ {card.card_prices[0].cardmarket_price}</p>
          <Button colorScheme="green" size="sm" onClick={() => handleAddToCart(card)}>
            Comprar
          </Button>
        </>
      )}
    </div>
  );
};
