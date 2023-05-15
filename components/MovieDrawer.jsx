import { useEffect, useState } from "react";
import { Button, Textarea  } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import Review from "./Review";
import styles from "./MovieDrawer.module.css";
import { CircularProgress} from '@chakra-ui/react'


const MovieDrawer = ({ movie, isLoggedIn,userName }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast()
  const getMovie = async () => {
    setLoading(true);
    try{
      const data = await axios.get(
        `https://next-js-movie-tau.vercel.app/api/reviews/movie?id=${movie.id}`
        );
      setReviews(data.data.reviews);
      setLoading(false);
    }
    catch(err){
      if(err.response.status === 404){toast({
        title: 'No reviews found',
        position: 'top',
        description: "Be the first to write a review!",
        status: 'info',
        duration: 2000,
        isClosable: true,
      })
      setLoading(false);
    }
    }  
  };
  useEffect(() => {
    getMovie();
  }, []);

  const saveHandler = async () => {
    const response = await axios.post("https://next-js-movie-tau.vercel.app/api/reviews", {
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
        reviewer_email: localStorage.getItem("email"),                                        // h ki is volt az iro.
        text: newReview,
        liked: 0,

      },
    });
    const data = await axios.get(
      `https://next-js-movie-tau.vercel.app/api/reviews/movie?id=${movie.id}`
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
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt=""
          />
          <h3>{movie.title}</h3>
          <h4> <strong>Release date:</strong> {movie.release_date}</h4>
          <h5> <strong>Avereage vote:</strong> {movie.vote_average}</h5>
          <p>{movie.overview}</p>
        </div>

      {loading ? 
      <div className={styles.loading} >
        <CircularProgress isIndeterminate color="blue.600" /> 
      </div>:
        <div className={styles.rightReviews}>
          <h2>Reviews</h2>
          <div className={styles.oldReviews}>
            {reviews.length > 0 ?
              reviews.map((review, i) => <Review key={i} setReviews={setReviews} review={review} movieId={movie.id} getMovie={getMovie} />) : <h3>No reviews yet.</h3>}
          </div>
          {isLoggedIn && (
            <Textarea value={newReview} placeholder='Here is a sample placeholder' onInput={(e) => setNewReview(e.target.value)} width='100%'/>
          )}
          {isLoggedIn && (
            <Button
              isDisabled={newReview.length > 0 ? false : true}
              onClick={saveHandler}
              colorScheme="green"
              variant="solid"
              className={styles.saveButton}
            >
              Save review
            </Button>
          )}

        </div>
}

      </div>
    </div>
  );
};

export default MovieDrawer;
