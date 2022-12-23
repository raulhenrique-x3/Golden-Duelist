import styles from "./cardBox.module.scss";
import React from "react";

interface IProps {
  card_images?: string;
  card_prices?: string;
  alt?: string;
  children?: JSX.Element[] | React.ReactNode;
}

export const Card: React.FC<IProps> = ({ card_images, card_prices, alt, children }) => {
  return (
    <div className={styles.cardBox}>
      <img src={card_images} alt={alt} className={styles.cardImage} />
      <h5 className={styles.cardPrice}>{card_prices}</h5>
      <div className={styles.children}>{children}</div>
    </div>
  );
};
