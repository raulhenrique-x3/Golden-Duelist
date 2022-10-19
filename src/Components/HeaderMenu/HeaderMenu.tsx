import { BsSearch, BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
import styles from "../Header/header.module.scss";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export const HeaderMenu = () => {
  return (
    <>
      <div className={styles.searchBar}>
        <span className={styles.inputSearchIcon}>
          <input type={"search"} className={styles.inputSearch} placeholder={"Pesquisar..."} />
          <BsSearch />
        </span>
      </div>

      <ul className={styles.navList}>
        <li className={styles.navLi}>
          <Link to={"/"}>
            Home
            <IoIosArrowForward className={styles.IoIoArrow} />
          </Link>
        </li>
        <li className={styles.navLi}>
          Favoritos
          <IoIosArrowForward className={styles.IoIoArrow} />
        </li>
        <li className={styles.navLi}>
          <Link to={"/cardSearch"}>
            Card Search
            <IoIosArrowForward className={styles.IoIoArrow} />
          </Link>
        </li>
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
  );
};
