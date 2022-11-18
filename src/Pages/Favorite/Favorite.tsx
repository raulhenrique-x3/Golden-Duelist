import styles from "./favorite.module.scss";
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCartFill, BsFillInfoSquareFill, BsTrashFill } from "react-icons/bs";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { clearFavorite, removeFromFavorite } from "../../Redux/Features/favoriteSlice";
import { ICard } from "../../Interfaces/interfaces";
import { addToCart } from "../../Redux/Features/cartSlice";

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
      <main className={styles.mainFavoriteItems}>
        <section className={styles.sectionFavoriteItems}>
          <div className={styles.favoriteFullItems}>
            <span className={styles.myFavorite}>
              <p>Meus favoritos:</p>
              <Button
                size={"sm"}
                colorScheme="red"
                variant="outline"
                onClick={() => dispatch(clearFavorite(favorite.favoriteItems.find((item) => item.id)))}
              >
                Limpar
              </Button>
            </span>
            <div className={styles.favoriteCard}>
              {favorite.favoriteItems.map((item) => (
                <div className={styles.favoriteItemContainer} key={item.id}>
                  <img src={item?.card_images[0]?.image_url} alt={item?.name} className={styles.itemImage} />
                  <div className={styles.itemInfo}>
                    <span className={styles.itemNameIcon}>
                      <Link to={`/searchedCard/${item?.name}`}>
                        <p className={styles.itemName}>{item?.name}</p>
                      </Link>
                      <div className={styles.favoriteIcons}>
                        <Button colorScheme="green" size="xs" onClick={() => handleAddToCart(item)}>
                          <BsFillCartFill className={styles.BsFillCart} />
                        </Button>
                        <Button colorScheme="blue" size="xs" onClick={() => handleAddToCart(item)}>
                          <BsFillInfoSquareFill className={styles.BsFillInfoSquareFill} />
                        </Button>
                        <Button colorScheme="red" size="xs" onClick={() => handleRemoveFromFavorites(item.id)}>
                          <BsTrashFill className={styles.BsTrashFill} />
                        </Button>
                      </div>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
};