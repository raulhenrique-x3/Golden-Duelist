import styles from "./cardSearched.module.scss";
import { Box, Button, Skeleton, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { useGetAllStaplesQuery } from "../../Redux/Features/productsAPI";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Features/cartSlice";
import { ICard } from "../../Interfaces/interfaces";
import { Link } from "react-router-dom";
import { BsFillCartFill, BsFillHeartFill } from "react-icons/bs";
import { addToFavorite } from "../../Redux/Features/favoriteSlice";

interface ICardProducts {
  card: ICard;
  set_name?: string;
  set_code?: string;
  set_rarity?: string;
  cardmarket_price?: string;
  tcgplayer_price?: string;
  ebay_price?: string;
  amazon_price?: string;
  coolstuffinc_price?: string;
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
    <div className={styles.mostWantedCards} key={card?.id}>
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
          <figure className={styles.cardFigure}>
            <img className={styles.productImage} src={card?.card_images[0]?.image_url} alt={card?.name} />

            <figcaption className={styles.figCaptionInfos}>
              <Link to={`/searchedCard/${card?.name}`}>
                <h2 className={styles.productName}>{card?.name}</h2>
              </Link>
              <p>{card?.desc}</p>
              <p className={styles.productName}>Card Price: $ {card?.card_prices[0]?.cardmarket_price}</p>
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
          <div className={styles.cardSet}>
            <TableContainer width={"container.sm"} border={"1px"} borderRadius={"5px"}>
              <Table
                variant="simple"
                colorScheme="black"
                size={"sm"}
                width={"container.sm"}
                className={styles.setTable}
              >
                <Thead>
                  <Tr>
                    <Th>Set name</Th>
                    <Th>Set code</Th>
                    <Th>Set rarity</Th>
                  </Tr>
                </Thead>
                {card?.card_sets?.map((set: ICardProducts, key) => (
                  <Tbody key={key}>
                    <Tr>
                      <Td>{set?.set_name}</Td>
                      <Td>{set?.set_code}</Td>
                      <Td>{set?.set_rarity}</Td>
                    </Tr>
                  </Tbody>
                ))}
              </Table>
            </TableContainer>
          </div>

          <div className={styles.cardPrice}>
            {card?.card_prices?.map((set: ICardProducts) => (
              <div className={styles.pricesInfo} key={card?.id}>
                <span>
                  <p>Card Market: </p>
                  <p>{set?.cardmarket_price}</p>
                </span>
                <span>
                  <p>TCG Player: </p>
                  <p>{set?.tcgplayer_price}</p>
                </span>
                <span>
                  <p>Ebay: </p>
                  <p>{set?.ebay_price}</p>
                </span>
                <span>
                  <p>Amazon: </p>
                  <p>{set?.amazon_price}</p>
                </span>
                <span>
                  <p>CoolStuff: </p>
                  <p>{set?.coolstuffinc_price}</p>
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
