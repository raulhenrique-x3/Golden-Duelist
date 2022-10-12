import styles from "./cart.module.scss";
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { BsTrashFill } from "react-icons/bs";
import Marquee from "react-fast-marquee";
import { removeFromCart } from "../../Redux/Features/cartSlice";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const CartItem = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  function handleRemoveFromCart(cart: RootState) {
    console.log(dispatch(removeFromCart(cart)));
  }
  const navigate = useNavigate();

  const [totalValue, setTotalValue] = useState(0);
  const totalShipping = 10;
  useEffect(() => {
    let initialValue = 0;
    cart.cartItems.map((card) => (initialValue += card.cartQuantity * card.card_prices[0].cardmarket_price));
    setTotalValue(initialValue);
  }, [cart]);

  if (cart.cartItems.length === 0) {
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
      <div className={styles.cartFullItems}>
        <div className={styles.cartCard}>
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
        </div>

        <div className={styles.boxBuyInfo}>
          <div className={styles.boxBuyCep}>
            <p className={styles.boxBuyTitle}>Entrega</p>
            <p className={styles.boxBuySubtitle}>Calcular frete para o CEP:</p>
            <div className={styles.inputButtonCep}>
              <input type={"text"} placeholder={"Meu cep"} className={styles.cepInput} />
              <Button colorScheme={"blue"} size="md">
                Calcular
              </Button>
            </div>
          </div>
          <div className={styles.totalItemsInfo}>
            <span className={styles.subtotal}>
              <p className={styles.subtotalText}>Subtotal: </p>
              <p className={styles.subtotalValue}>${totalValue.toFixed(2)}</p>
              <p className={styles.totalShippingText}>Frete: </p>
              <p className={styles.totalShippingValue}>$ {totalShipping}</p>
              <p className={styles.total}>Total: </p>
              <p className={styles.totalValue}>${totalValue + totalShipping}</p>
            </span>
          </div>
        </div>
      </div>
    );
};
