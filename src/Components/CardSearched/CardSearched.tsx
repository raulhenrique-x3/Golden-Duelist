import styles from "./cardSearched.module.scss";
import { useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
  WrapItem,
  Wrap,
  Spinner,
} from "@chakra-ui/react";
import { useGetAllStaplesQuery } from "../../Redux/Features/productsAPI";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Features/cartSlice";
import { ICard } from "../../Interfaces/interfaces";
import { Link } from "react-router-dom";
import { BsFillCartFill, BsFillHeartFill } from "react-icons/bs";
import { BiCommentAdd } from "react-icons/bi";
import { addToFavorite } from "../../Redux/Features/favoriteSlice";
import { RootState } from "../../Redux/store";
import { addComment } from "../../Redux/Features/commentsSlice";

interface ICardProducts {
  card: ICard;
  set_name?: string;
  set_code?: string;
  set_rarity?: string;
  cardmarket_price?: string;
  tcgplayer_price?: string;
  ebay_price?: string;
  amazon_price?: string;
  coolstuffinc_price?: string;
}

export const CardSearched: React.FC<ICardProducts> = ({ card }) => {
  const [loadMoreComments, setLoadMoreComments] = useState(3);
  const [userMakeComment, setUserMakeComment] = useState("");
  const [seeMore, setSeeMore] = useState(true);
  const { isError, isLoading } = useGetAllStaplesQuery([]);
  const dispatch = useDispatch();
  const comment = useSelector((state: RootState) => state.comments);
  const likes = useSelector((state: RootState) => state.comments.likeComment);
  const handleAddToCart = (card: ICard) => {
    dispatch(addToCart(card));
  };

  const handleAddToFavorite = (card: ICard) => {
    dispatch(addToFavorite(card));
  };

  async function handleAddComment() {
    await dispatch(addComment(userMakeComment));
    setUserMakeComment("");
  }

  async function handleSubmit(e: any) {
    await e.preventDefault();
    setUserMakeComment("");
  }

  return (
    <div className={styles.mostWantedCards} key={card?.id}>
      {isLoading ? (
        <Box>
          <Box className={styles.box}>
            <Spinner className={styles.spinner} />
          </Box>
        </Box>
      ) : isError ? (
        <Box className={styles.box}>
          <Spinner color="red.500" className={styles.spinner} />
          <p className={styles.errorInfo}>Something wrent wrong...</p>
        </Box>
      ) : (
        <>
          <figure className={styles.cardFigure}>
            <img className={styles.productImage} src={card?.card_images[0]?.image_url} alt={card?.name} />

            <figcaption className={styles.figCaptionInfos}>
              <Link to={`/searchedCard/${card?.name}`}>
                <h2 className={styles.productName}>{card?.name}</h2>
              </Link>
              <p>{card?.desc}</p>
              <p className={styles.productName}>Card Price: $ {card?.card_prices[0]?.cardmarket_price}</p>
              <div className={styles.userButtons}>
                <Button colorScheme="green" size="sm" onClick={() => handleAddToCart(card)}>
                  <BsFillCartFill className={styles.BsFillCart} />
                </Button>
                <Button colorScheme="red" size="sm" onClick={() => handleAddToFavorite(card)}>
                  <BsFillHeartFill className={styles.BsFillCart} />
                </Button>
              </div>
            </figcaption>
          </figure>
          <div className={styles.cardSet}>
            <TableContainer width={"container.sm"} border={"1px"} borderRadius={"5px"}>
              <Table
                variant="simple"
                colorScheme="black"
                size={"sm"}
                width={"container.sm"}
                className={styles.setTable}
              >
                <Thead>
                  <Tr>
                    <Th>Set name</Th>
                    <Th>Set code</Th>
                    <Th>Set rarity</Th>
                  </Tr>
                </Thead>
                {card?.card_sets?.map((set: ICardProducts, key) => (
                  <Tbody key={key}>
                    <Tr>
                      <Td>{set?.set_name}</Td>
                      <Td>{set?.set_code}</Td>
                      <Td>{set?.set_rarity}</Td>
                    </Tr>
                  </Tbody>
                ))}
              </Table>
            </TableContainer>
          </div>

          <div className={styles.cardPrice}>
            {card?.card_prices?.map((set: ICardProducts) => (
              <div className={styles.pricesInfo} key={card?.id}>
                <span>
                  <p>Card Market: </p>
                  <p>$ {set?.cardmarket_price}</p>
                </span>
                <span>
                  <p>TCG Player: </p>
                  <p>$ {set?.tcgplayer_price}</p>
                </span>
                <span>
                  <p>Ebay: </p>
                  <p>$ {set?.ebay_price}</p>
                </span>
                <span>
                  <p>Amazon: </p>
                  <p>$ {set?.amazon_price}</p>
                </span>
                <span>
                  <p>CoolStuff: </p>
                  <p>$ {set?.coolstuffinc_price}</p>
                </span>
              </div>
            ))}
          </div>

          <div className={styles.comments}>
            <h2>Comentários: {comment.comments.length}</h2>
            {comment.comments
              .map((comment: any, key: any) => (
                <div key={key} className={styles.usersComments}>
                  <Wrap>
                    <WrapItem display={"flex"} gap={"8px"} alignItems={"center"}>
                      <Avatar name={comment.userName} />
                      <div className={styles.userInfos}>
                        <p className={styles.userName}>{comment?.userName}</p>
                        <p className={styles.userID}>#{comment?.userID}</p>
                        <span className={styles.dateHour}>
                          <p className={styles.commentDate}>{comment?.commentDate}</p>
                        </span>
                      </div>
                    </WrapItem>
                  </Wrap>

                  <p>
                    {seeMore ? comment?.userComment?.slice(0, 150) : comment?.userComment}
                    {comment?.userComment?.length > 150 ? (
                      <span className={styles.seeMore} onClick={() => setSeeMore(!seeMore)}>
                        {seeMore ? " ...ver mais" : " ver menos"}
                      </span>
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              ))
              .slice(0, loadMoreComments)}
            <div className={styles.showMoreButtons}>
              {loadMoreComments <= comment?.comments?.length ? (
                <Button colorScheme="blue" variant="outline" onClick={() => setLoadMoreComments(loadMoreComments + 2)}>
                  Carregar mais...
                </Button>
              ) : (
                <Button colorScheme="blue" variant="outline" onClick={() => setLoadMoreComments(4)}>
                  Mostra menos...
                </Button>
              )}
            </div>

            <form onSubmit={handleSubmit} className={styles.commentForm}>
              <input
                type={"text"}
                placeholder={"Digite um comentário..."}
                value={userMakeComment}
                onChange={(e) => setUserMakeComment(e.target.value)}
                className={styles.commentInput}
              ></input>
              <button type={"submit"} onClick={handleAddComment}>
                <BiCommentAdd className={styles.BiCommentAdd} />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
