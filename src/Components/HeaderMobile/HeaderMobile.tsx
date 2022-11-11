import { useState } from "react";
import { BsSearch, BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "../Header/header.module.scss";

export const HeaderMobile = () => {
  const [searchCard, setSearchCard] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!searchCard) {
      return;
    }
    navigate(`/cardSearch/${searchCard}`);
    setSearchCard("");
  }
  console.log(searchCard);
  return (
    <>
      <div className={styles.searchBar}>
        <form className={styles.inputSearchIcon} onSubmit={handleSubmit}>
          <input
            type={"submit"}
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
          <Link to={`/cardSearch`}>
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
