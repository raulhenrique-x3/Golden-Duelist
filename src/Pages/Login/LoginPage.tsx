import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsFacebook, BsApple } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import styles from "./loginPage.module.scss";

export const LoginPage = () => {
  return (
    <main className={styles.loginPage}>
      <section className={styles.loginSection}>
        <div className={styles.loginContent}>
          <div className={styles.loginInfos}>
            <header className={styles.loginHeader}>
              <p className={styles.loginTitle}>Bem-vindo a nossa comunidade!</p>
              <p className={styles.loginSubTitle}>A maior comunidade de Yu-Gi-Oh do Brasil</p>
            </header>
            <figure className={styles.loginInfoFig}>
              <img
                src={require("../../Assets/all_millennium_items_render__legacy_of_the_duelist_by_maxiuchiha22_dcx3lvi-fullview.png")}
                alt="all millennium items render legacy of the duelist fullview"
                className={styles.milleniumImg}
              />
            </figure>
          </div>
          <div className={styles.loginBox}>
            <p className={styles.login}>Login</p>
            <span className={styles.loginInputs}>
              <input type={"email"} placeholder="Digite seu email" className={styles.loginInput} />
              <input type={"password"} placeholder="Digite sua senha" className={styles.loginInput} />
              <span className={styles.passwordRecovery}>
                <Link to={""}>Esqueci minha senha</Link>
              </span>
            </span>

            <Button colorScheme={"blue"} size={"md"} width={"full"}>
              Entrar
            </Button>
            <p>Ou registre-se com:</p>
            <div className={styles.altLogin}>
              <BsFacebook className={styles.BsFacebook} />
              <SiGmail className={styles.SiGmail} />
              <BsApple className={styles.BsApple} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
