import styles from "./cart.module.scss";
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { BsTrashFill, BsFillCartDashFill, BsFillCartPlusFill } from "react-icons/bs";
import { decrementQuantity, removeFromCart, clearCart, incrementQuantity } from "../../Redux/Features/cartSlice";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ICard } from "../../Interfaces/interfaces";

export const CartItem = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  function handleRemoveFromCart(cart: RootState) {
    dispatch(removeFromCart(cart));
  }

  function handleIncrement(cart: RootState) {
    dispatch(incrementQuantity(cart));
  }

  function handleDecrement(cart: RootState) {
    dispatch(decrementQuantity(cart));
  }

  const navigate = useNavigate();

  const [totalValue, setTotalValue] = useState(0);
  const totalShipping = 10;
  const totalBuyValue = totalShipping + totalValue;

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
          <span className={styles.myCart}>
            <p>Meu carrinho:</p>
            <Button
              size={"sm"}
              colorScheme="red"
              variant="outline"
              onClick={() => dispatch(clearCart(cart.cartItems.find((item) => item.id)))}
            >
              CLEAR CART
            </Button>
          </span>
          {cart.cartItems.map((item) => (
            <div className={styles.cartItemContainer} key={item.id}>
              <img src={item?.card_images[0]?.image_url} alt={item?.name} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                <span className={styles.itemNameIcon}>
                  <Link to={`/searchedCard/${item?.name}`}>
                    <p className={styles.itemName}>{item?.name}</p>
                  </Link>
                  <div className={styles.cartIcons}>
                    <button>
                      <BsTrashFill className={styles.BsTrashFill} onClick={() => handleRemoveFromCart(item.id)} />
                    </button>
                  </div>
                </span>

                <p className={styles.itemValue}>
                  Subtotal: $ {item.cartQuantity * item.card_prices[0].cardmarket_price}
                </p>
                <span className={styles.quantityItems}>
                  <button>
                    <BsFillCartDashFill className={styles.decrementQuantity} onClick={() => handleDecrement(item.id)} />
                  </button>
                  <p className={styles.itemQnt}>{item?.cartQuantity}</p>
                  <BsFillCartPlusFill className={styles.incrementQuantity} onClick={() => handleIncrement(item.id)} />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.boxBuyInfo}>
          <div className={styles.boxBuyCep}>
            <div className={styles.titleItems}>
              <p className={styles.boxBuyTitle}>Entrega</p>
              <p className={styles.boxBuySubtitle}>Calcular frete para o CEP:</p>
            </div>
            <div className={styles.inputButtonCep}>
              <input type={"text"} placeholder={"Meu cep"} className={styles.cepInput} />
              <Button colorScheme={"blue"} size="md">
                Calcular
              </Button>
            </div>
          </div>
          <div className={styles.totalItemsInfo}>
            <span className={styles.subtotal}>
              <div className={styles.buyInfos}>
                <p className={styles.subtotalText}>Subtotal: </p>
                <p className={styles.subtotalValue}>${parseInt(totalValue.toFixed(2))}</p>
              </div>
              <div className={styles.buyInfos}>
                <p className={styles.totalShippingText}>Frete: </p>
                <p className={styles.totalShippingValue}>${totalShipping}</p>
              </div>

              <div className={styles.buyInfos}>
                <p className={styles.total}>Total: </p>
                <p className={styles.totalValue}>${parseFloat(totalBuyValue.toFixed(2))}</p>
              </div>
              <Button colorScheme={"green"} size={"lg"} width={"full"}>
                Finalizar compra
              </Button>
            </span>
          </div>
        </div>
      </div>
    );
};
