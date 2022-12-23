import styles from "./cardContainer.module.scss";

interface IProps {
  children?: JSX.Element[] | React.ReactNode;
}

export const CardContainer: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <div className={styles.cardsContainer}>{children}</div>
    </>
  );
};
