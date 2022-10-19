import styles from "./cardInfo.module.scss";
import { Box, Button, Skeleton } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Features/cartSlice";
import { ICard } from "../../Interfaces/interfaces";
import { useGetAllCardsQuery } from "../../Redux/Features/productsAPI";

interface ICardInfos {
  card: ICard;
}

export const CardInfos: React.FC<ICardInfos> = ({ card }) => {
  const { isError, isLoading } = useGetAllCardsQuery([]);
  const dispatch = useDispatch();
  const handleAddToCart = (card: ICard) => {
    dispatch(addToCart(card));
  };

  return (
    <div className={styles.mainInfo}>
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
          <p className={styles.productName}>{card?.name}</p>
          <p className={styles.productPrice}>$ {card.card_prices[0].cardmarket_price}</p>
          <Button colorScheme="green" size="sm" onClick={() => handleAddToCart(card)}>
            Comprar
          </Button>
        </>
      )}
    </div>
  );
};
