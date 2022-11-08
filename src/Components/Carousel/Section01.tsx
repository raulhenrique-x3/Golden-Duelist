import { Button } from "@chakra-ui/react";
import styles from "./carousel.module.scss";
import { Products } from "../../Pages/MainPage/MainPage";

export const Section01 = () => {
  return (
    <main className={styles.mainSect}>
      <div className={styles.imgSrc}>
        <span className={styles.mainInfo}>
          <p className={styles.mainText}>Tenha tudo o que você precisa para jogar Yu-Gi-Oh!</p>
          <Button color={"blue"} size={"sm"}>
            Explorer
          </Button>
        </span>
        <img className={styles.mainImg} src={require("../../Assets/Red-Eyes-Dark-Dragoon.png")} alt="blueEyesDef" />
      </div>
      <Products />
    </main>
  );
};
