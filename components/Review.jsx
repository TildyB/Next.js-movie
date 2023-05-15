import styles from "./Review.module.css";
import { useEffect, useState } from "react";
import { Button, useToast, Tooltip } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { SlLike } from "react-icons/sl";
import axios from "axios";
const Review = ({ review, movieId, setReviews }) => {
  const toast = useToast();
  const [ownComment, setOwnComment] = useState(false);
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const deleteComment = async () => {
    try {
      const response = await axios.delete(
        `https://next-js-movie-tau.vercel.app/api/reviews?id=${review._id}&movieId=${movieId}`
      );
    } catch (err) {
      console.log(err);
    }
    const data = await axios.get(
      `https://next-js-movie-tau.vercel.app/api/reviews/movie?id=${movieId}`
    );
    toast({
      title: "Comment Deleted",
      description: "Your comment has been deleted",
      status: "warning",
      duration: 2000,
      isClosable: true,
    });
    setReviews(data.data.reviews);
  };

  const addLike = async () => {
    try {
      const response = await axios.put(
        `https://next-js-movie-tau.vercel.app/api/reviews?email=${localStorage.getItem(
          "email"
        )}&id=${review._id}&movieId=${movieId}&like=1`
      );
    } catch (err) {
      console.log(err);
    }
    const data = await axios.get(
      `https://next-js-movie-tau.vercel.app/api/reviews/movie?id=${movieId}`
    );
    setReviews(data.data.reviews);
    checkIfLiked();
  };
  const removeLike = async () => {
    try {
      const response = await axios.put(
        `https://next-js-movie-tau.vercel.app/api/reviews?email=${localStorage.getItem(
          "email"
        )}&id=${review._id}&movieId=${movieId}&dislike=1`
      );
    } catch (err) {
      console.log(err);
    }
    const data = await axios.get(
      `https://next-js-movie-tau.vercel.app/api/reviews/movie?id=${movieId}`
    );
    setAlreadyLiked(false);
    setReviews(data.data.reviews);
  };

  const checkIfLiked = async () => {
    try {
      const response = await axios.get(
        `https://next-js-movie-tau.vercel.app/api/reviews?email=${localStorage.getItem(
          "email"
        )}&id=${review._id}`
      );

      if (response.data) setAlreadyLiked(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (review.reviewer_email === localStorage.getItem("email"))
      setOwnComment(true);
    checkIfLiked();
  }, []);
  return (
    <div className={styles.revCard}>
      <div className={styles.innerUpperDiv}>
        <div>
          <h5>{review.reviewer}</h5>
          <p>{review.text}</p>
        </div>
        <div>
          {ownComment && (
            <Button
              height="20px"
              width="10px"
              onClick={deleteComment}
              colorScheme="red"
              size="xs"
            >
              <DeleteIcon />
            </Button>
          )}
        </div>
      </div>
      <div>
        <div>
          {review.liked > 0 ? (
            <div className={styles.likeAmount}>
                <div className={styles.alreadyLiked}>
                    <SlLike style={{ color: 'white' }} />
                </div>
              <h1>{review.liked}</h1>
            </div>
          ) : (
            <h1>No likes yet! </h1>
          )}
        </div>
        <div className={styles.buttonDiv}>
          {alreadyLiked ? (
            <div onClick={removeLike} className={styles.likedButton}>
              <AiFillLike />
              <h1>Liked</h1>
            </div>
          ) : (
            <div onClick={addLike} className={styles.likeButton}>
              <BiLike />
              <h1>Like</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default Review;
