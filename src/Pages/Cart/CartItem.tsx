import styles from "./cart.module.scss";
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { BsTrashFill } from "react-icons/bs";
import Marquee from "react-fast-marquee";
import { ICard } from "../../Interfaces/interfaces";
import { removeFromCart } from "../../Redux/Features/cartSlice";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const CartItem = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  function handleRemoveFromCart(cart: RootState) {
    console.log(dispatch(removeFromCart(cart)));
  }
  const navigate = useNavigate();

  if (cart.cartItems.length == 0) {
    return (
      <div className={styles.emptyCart}>
        <p className={styles.emptyCartMsg}>CARRINHO VAZIO... :/</p>
        <Button colorScheme="blue" size="sm" onClick={() => navigate("/")}>
          Home
        </Button>
      </div>
    );
  } else
    return (
      <>
        {cart.cartItems.map((item) => (
          <div className={styles.cartItemContainer} key={item.id}>
            <img src={item?.card_images[0].image_url} alt={item?.name} className={styles.itemImage} />
            <div className={styles.itemInfo}>
              <span className={styles.itemNameIcon}>
                <Marquee gradient={false} speed={5} className={styles.itemName}>
                  {item?.name}
                </Marquee>
                <BsTrashFill className={styles.BsTrashFill} onClick={() => handleRemoveFromCart(item.id)} />
              </span>

              <p className={styles.itemValue}>Subtotal: ${item?.card_prices[0].cardmarket_price}</p>
              <p className={styles.itemQnt}>Qnt: {item?.cartQuantity}</p>
            </div>
          </div>
        ))}
      </>
    );
};
