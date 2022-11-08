import { BsFillCartFill, BsSearch } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { HeaderMenu } from "../HeaderMenu/HeaderMenu";
import styles from "./header.module.scss";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchCard, setSearchCard] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!searchCard) {
      return;
    }
    navigate(`/${searchCard}`);
    setSearchCard("");
  }

  return (
    <header className={styles.myHeader}>
      <div className={styles.headerContent}>
        <Link to={"/"}>
          <h1 className={styles.myLogo}>Golden Duelist</h1>
        </Link>
        <form className={styles.searchBarPC} onSubmit={handleSubmit}>
          <span className={styles.inputSearchIcon}>
            <input
              type={"text"}
              className={styles.inputSearch}
              onChange={(e) => setSearchCard(e.target.value)}
              value={searchCard}
              placeholder={"Pesquisar..."}
            />
            <button className={styles.searchButton}>
              <BsSearch onClick={handleSubmit} />
            </button>
          </span>
        </form>
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
              <BsFillCartFill className={styles.BsFillCart} onClick={() => setShowMenu(!showMenu)} />
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
