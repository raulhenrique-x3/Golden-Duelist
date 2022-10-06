import axios from "axios";
import React, { useEffect, useState } from "react";
import { RootState } from "../../Redux/store";
import { ICard } from "../../Interfaces/interfaces";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import styles from "./products.module.scss";
import { CardProducts } from "../CardProducts/CardProducts";
import { BoxPOTE } from "../MainBox/BoxPOTE";
import { useSelector } from "react-redux";
import { useGetAllStaplesQuery } from "../../Redux/Features/productsAPI";

export const Products = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const { data } = useGetAllStaplesQuery("");

  return (
    <div className={styles.products}>
      <div className={styles.productsItems}>
        <div className={styles.allMainProducts}>
          <div className={styles.mainProducts}>
            <div className={styles.bsWanted}>
              <h2 className={styles.mostWanted}>Mais procurados</h2>
              <BsFillQuestionCircleFill />
            </div>
            <div className={styles.cardProducts}>
              {data?.data.slice(0, 3).map((card: ICard) => (
                <CardProducts card={card} key={card.id} />
              ))}
            </div>
          </div>
          <div className={styles.mainProducts}>
            <div className={styles.bsWanted}>
              <h2 className={styles.mostWanted}>Staples</h2>
              <BsFillQuestionCircleFill />
            </div>
            <div className={styles.cardProducts}>
              {data?.data.slice(3, 6).map((card: ICard) => (
                <CardProducts card={card} key={card.id} />
              ))}
            </div>
          </div>
        </div>

        <BoxPOTE />
      </div>
    </div>
  );
};
