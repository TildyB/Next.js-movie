import { useEffect, useState } from "react";
import { Button, Input } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import Review from "./Review";
import styles from "./MovieDrawer.module.css";

const MovieDrawer = ({ movie, isLoggedIn }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const toast = useToast()
  useEffect(() => {
    const getMovie = async () => {
      try{
        const data = await axios.get(
          `http://localhost:3000/api/reviews/movie?id=${movie.id}`
          );
        setReviews(data.data.reviews);
      }
      catch(err){
        if(err.response.status === 404)toast({
          title: 'No reviews found',
          position: 'top',
          description: "Be the first to write a review!",
          status: 'info',
          duration: 2000,
          isClosable: true,
        })
      }  
    };
    getMovie();
  }, []);

  const saveHandler = async () => {
    const response = await axios.post("http://localhost:3000/api/reviews", {
      title: movie.title,
      id: movie.id,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      adult: movie.adult,
      release_date: movie.release_date,
      overview: movie.overview,
      vote_average: movie.vote_average,
      review: {
        reviewer: localStorage.getItem("user"), // ezt nem kene kuldeni. Majd a BE fogja authMW-vel megtalalni sub alapjan,
                                                // h ki is volt az iro.
        text: newReview,
      },
    });
    const data = await axios.get(
      `http://localhost:3000/api/reviews/movie?id=${movie.id}`
    );

    setReviews(data.data.reviews);
    setNewReview("");
    console.log("review iras sikeres-e", response.data);
  };

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100%",
        background: `linear-gradient(0deg, #032541d5, #032541d5), url(https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.backdrop_path})`,
        backgroundSize: "cover",
      }}
      className={styles.drawerBackground}
    >
      {/* <button onClick={onClose}>Close Drawer</button> */}
      <div className={styles.drawerContainer}>


        <div className={styles.leftReviews}>
          <img
            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
            alt=""
          />
          <h3>{movie.title}</h3>
          <h4> <strong>Release date:</strong> {movie.release_date}</h4>
          <h5> <strong>Avereage vote:</strong> {movie.vote_average}</h5>
          <p>{movie.overview}</p>
        </div>


        <div className={styles.rightReviews}>
          <h2>Reviews</h2>
          <div className={styles.oldReviews}>
            {reviews.length > 0 ?
              reviews.map((review, i) => <Review key={i} {...{ review }} />) : <h3>No reviews yet.</h3>}
          </div>
          {isLoggedIn && (
            <Input
              type="text"
              value={newReview}
              placeholder="Write a review"
              onInput={(e) => setNewReview(e.target.value)}
              width='100%'
            />
          )}
          {isLoggedIn && (
            <Button
              disabled={newReview.length > 1 ? false : true}
              onClick={saveHandler}
              colorScheme="green"
              variant="solid"
            >
              Save review
            </Button>
          )}

        </div>


      </div>
    </div>
  );
};

export default MovieDrawer;
