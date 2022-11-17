import { BsFacebook, BsFillCartFill, BsInstagram, BsSearch, BsYoutube } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { useState } from "react";
import styles from "./header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchCard, setSearchCard] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!searchCard) {
      return;
    }
    navigate(`/cardSearch/${searchCard}`);
    setShowMenu(!showMenu);
    setSearchCard("");
  }

  return (
    <header className={styles.myHeader}>
      <div className={styles.headerContent}>
        <Link to={"/"} onClick={() => setShowMenu(false)}>
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
            <button className={styles.searchButton} type={"submit"}>
              <BsSearch onClick={handleSubmit} />
            </button>
          </span>
        </form>
        <div className={styles.headerButtons}>
          <button className={styles.userButton}>
            <Link to={"/loginPage"} onClick={() => setShowMenu(false)}>
              <p className={styles.userActions}>
                Login
                <br />
                /Register
              </p>
            </Link>
          </button>

          <button className={styles.cartButton}>
            <Link to={"/Cart"} onClick={() => setShowMenu(false)}>
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
          <>
            <div className={styles.searchBar}>
              <form className={styles.inputSearchIcon} onSubmit={handleSubmit}>
                <input
                  type={"text"}
                  className={styles.inputSearch}
                  placeholder={"Pesquisar..."}
                  onChange={(e) => setSearchCard(e.target.value)}
                  value={searchCard}
                />
                <button type="submit" className={styles.BsSearch}>
                  <BsSearch onClick={handleSubmit} />
                </button>
              </form>
            </div>

            <ul className={styles.navList}>
              <Link to={"/"} onClick={() => setShowMenu(!showMenu)}>
                <li className={styles.navLi}>
                  Home
                  <IoIosArrowForward className={styles.IoIoArrow} />
                </li>
              </Link>
              <Link to={"/favorite"} onClick={() => setShowMenu(!showMenu)}>
                <li className={styles.navLi}>
                  Favoritos
                  <IoIosArrowForward className={styles.IoIoArrow} />
                </li>
              </Link>

              <Link to={`/cardSearch`} onClick={() => setShowMenu(!showMenu)}>
                <li className={styles.navLi}>
                  Card Search
                  <IoIosArrowForward className={styles.IoIoArrow} />
                </li>
              </Link>

              <li className={styles.navLi}>
                Metacall
                <IoIosArrowForward className={styles.IoIoArrow} />
              </li>
            </ul>
            <div className={styles.socialMedia}>
              <BsFacebook className={styles.bsIcon} />
              <BsInstagram className={styles.bsIcon} />
              <BsYoutube className={styles.bsIcon} />
            </div>
          </>
        </div>
      </nav>
    </header>
  );
}

export default Header;
