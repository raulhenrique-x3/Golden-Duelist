import { ICard } from "../../Interfaces/interfaces";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { MainPageCards } from "../../Components/MainPageCards/MainPageCards";
import { BoxPOTE } from "../../Components/MainBox/BoxPOTE";
import { useGetAllStaplesQuery } from "../../Redux/Features/productsAPI";
import styles from "./mainPage.module.scss";

export const Products = () => {
  const { data: getStaplesData } = useGetAllStaplesQuery("");

  return (
    <div className={styles.products}>
      <div className={styles.productsItems}>
        <div className={styles.allMainProducts}>
          <div className={styles.mainProducts}>
            <div className={styles.bsWanted}>
              <h2 className={styles.mostWanted}>Mais procurados</h2>
              <BsFillQuestionCircleFill />
            </div>
            <div className={styles.MainPageCards}>
              {getStaplesData?.data.slice(0, 3).map((card: ICard) => (
                <MainPageCards card={card} key={card.id} />
              ))}
            </div>
          </div>
          <div className={styles.mainProducts}>
            <div className={styles.bsWanted}>
              <h2 className={styles.mostWanted}>Staples</h2>
              <BsFillQuestionCircleFill />
            </div>
            <div className={styles.MainPageCards}>
              {getStaplesData?.data.slice(3, 6).map((card: ICard) => (
                <MainPageCards card={card} key={card.id} />
              ))}
            </div>
          </div>
        </div>

        <BoxPOTE />
      </div>
    </div>
  );
};
