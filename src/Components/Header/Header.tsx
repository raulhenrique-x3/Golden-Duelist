import { BsFillCartFill, BsSearch } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { HeaderMenu } from "../HeaderMenu/HeaderMenu";
import styles from "./header.module.scss";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <header className={styles.myHeader}>
      <div className={styles.headerContent}>
        <Link to={"/"}>
          <h1 className={styles.myLogo}>Golden Duelist</h1>
        </Link>
        <div className={styles.searchBarPC}>
          <span className={styles.inputSearchIcon}>
            <input type={"search"} className={styles.inputSearch} placeholder={"Pesquisar..."} />
            <BsSearch />
          </span>
        </div>
        <div className={styles.headerButtons}>
          <button className={styles.userButton} onClick={() => navigate("/loginPage")}>
            <FaUserCircle className={styles.FaUserCircle} />
            <p className={styles.userActions}>
              Login
              <br />
              /Register
            </p>
          </button>
          <button className={styles.cartButton}>
            <Link to={"/Cart"}>
              <BsFillCartFill className={styles.BsFillCart} />
            </Link>
          </button>
          <button className={styles.hamburguerButton} onClick={() => setShowMenu(!showMenu)}>
            <BiMenu className={styles.biMenu} />
          </button>
        </div>
      </div>
      <nav className={styles.navContent}>
        <div className={showMenu ? styles.showMenu : styles.hiddenMenu}>
          <HeaderMenu />
        </div>
      </nav>
    </header>
  );
}

export default Header;
