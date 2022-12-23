import styles from "../CardSearch/cardSearch.module.scss";
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCartFill, BsFillInfoSquareFill, BsTrashFill } from "react-icons/bs";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { clearFavorite, removeFromFavorite } from "../../Redux/Features/favoriteSlice";
import { ICard } from "../../Interfaces/interfaces";
import { addToCart } from "../../Redux/Features/cartSlice";
import { Card } from "../../Components/CardBox/Card";
import { CardContainer } from "../../Components/CardContainer/CardContainer";

export const Favorite = () => {
  const favorite = useSelector((state: RootState) => state.favorite);
  const dispatch = useDispatch();

  function handleRemoveFromFavorites(cart: RootState) {
    dispatch(removeFromFavorite(cart));
  }

  const handleAddToCart = (card: ICard) => {
    dispatch(addToCart(card));
  };

  const navigate = useNavigate();

  if (favorite.favoriteItems.length === 0) {
    return (
      <div className={styles.emptyFavorite}>
        <p className={styles.emptyFavoriteMsg}>SEM FAVORITOS... :/</p>
        <Button colorScheme="blue" size="sm" onClick={() => navigate("/")}>
          Home
        </Button>
      </div>
    );
  } else
    return (
      <section className={styles.searchedCardSection}>
        <main className={styles.cardSearchMain}>
          <CardContainer>
            {favorite.favoriteItems.map((card) => (
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
                    <BsFillCartFill className={styles.BsFillCart} />
                  </Button>

                  <Button colorScheme="blue" size="xs">
                    <Link to={`/searchedCard/${card?.name}`}>
                      <BsFillInfoSquareFill className={styles.BsFillInfoSquareFill} />
                    </Link>
                  </Button>

                  <Button colorScheme="red" size="xs" onClick={() => handleRemoveFromFavorites(card?.id)}>
                    <BsTrashFill className={styles.BsTrashFill} />
                  </Button>
                </div>
              </Card>
            ))}
          </CardContainer>
        </main>
      </section>
    );
};
