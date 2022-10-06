import { Button } from "@chakra-ui/react";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import styles from "./box.module.scss";
export const BoxPOTE = () => {
  return (
    <div className={styles.boxProducts}>
      <div className={styles.boxInfos}>
        <div className={styles.boxTitle}>
          <h2 className={styles.boxName}>Power of the Elements</h2>
          <BsFillQuestionCircleFill />
        </div>
        <img className={styles.boxImage} src={require("../../Assets/POTE.png")} alt={"Power of the Elements"} />
        <p className={styles.boxDescription}>
          Liberte o Poder dos Elementos neste inverno! Essa é a nova coleção principal de 100 cards de Yu-Gi-Oh!
          ESTAMPAS ILUSTRADAS (TCG). Descubra várias estratégias inéditas e encontre novos cards para temas favoritos,
          como os “HERÓIs do Elemento” de Yu-Gi-Oh! GX!
        </p>
        <span className={styles.buttonBox}>
          <Button colorScheme="green" variant={"outline"} size="sm">
            Mais informações
          </Button>
        </span>
      </div>

      <div className={styles.metaCall}>
        <div className={styles.boxTitle}>
          <h2 className={styles.boxName}>Metacall</h2>
          <BsFillQuestionCircleFill />
        </div>
        <img className={styles.boxImage} src={require("../../Assets/tourGuide.png")} alt={"Power of the Elements"} />
        <p className={styles.metaCallDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nemo consequuntur quasi culpa in laborum sed
          soluta, ipsam labore praesentium amet ullam dolor excepturi facere. Aliquam voluptatem neque nemo totam?
        </p>
        <span className={styles.buttonBox}>
          <Button colorScheme="green" variant={"outline"} size="sm">
            Mais informações
          </Button>
        </span>
      </div>
    </div>
  );
};
