import { CartItem } from "./CartItem";
import styles from "./cart.module.scss";

export const Cart = () => {
  return (
    <main className={styles.mainCartItems}>
      <section className={styles.sectionCartItems}>
        <CartItem />
      </section>
    </main>
  );
};
