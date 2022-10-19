import { CardProducts } from "../../Components/CardProducts/CardProducts";
import { ICard } from "../../Interfaces/interfaces";
import { useGetAllCardsQuery } from "../../Redux/Features/productsAPI";
import styles from "./cardSearch.module.scss";

export const CardSearch = () => {
  const { data } = useGetAllCardsQuery([]);
  return (
    <main className={styles.cardSearchMain}>
      <div className={styles.cardsContainer}>
        {data?.data.slice(0, 24).map((card: ICard) => (
          <CardProducts card={card} key={card.id} />
        ))}
      </div>
    </main>
  );
};
