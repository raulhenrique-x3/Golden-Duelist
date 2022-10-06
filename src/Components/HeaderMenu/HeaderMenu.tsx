import { BsSearch, BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
import styles from "../Header/header.module.scss";
import { navItems } from "../../const/navItems";
import { IoIosArrowForward } from "react-icons/io";

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
        {navItems.map((item, i) => (
          <li key={i} className={styles.navLi}>
            {item}
            <IoIosArrowForward className={styles.IoIoArrow} />
          </li>
        ))}
      </ul>
      <div className={styles.socialMedia}>
        <BsFacebook className={styles.bsIcon} />
        <BsInstagram className={styles.bsIcon} />
        <BsYoutube className={styles.bsIcon} />
      </div>
    </>
  );
};
