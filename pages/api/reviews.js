import Movie from '../../database/schema.movie'
import User from '../../database/schema.user'
import connect from '../../database/connection'

const handler = async (req, res) => {
    await connect().catch(err => console.log(err))
    if(req.method == "GET"){
      const reviewId = req.query.id;
      const userEmail = req.query.email
      const checkifLiked = await User.findOne({email: userEmail, likedReviews: reviewId})
      if(checkifLiked){
        res.send(true)
      }else{
        res.send(false)
      }

    }

    if(req.method == "POST"){
        const result = req.body
        console.log(result.review)
        const movie = await Movie.findOne({ id: result.id })
        if (!movie) {
            const newMovie = await Movie.create({
                title: result.title,
                id: result.id,
                poster_path: result.poster_path,
                backdrop_path: result.backdrop_path,
                adult: result.adult,
                release_date: result.release_date,
                overview: result.overview,
                vote_average: result.vote_average,
                reviews: [
                    result.review // ebben a reviewer-t mi adjuk meg a sub kereses alapjan

                ]
            }) 
            console.log(newMovie)
            return res.send(newMovie)
        }
    
        const updatedMovie = await Movie.findOneAndUpdate({ id: result.id }, { $push: { reviews: [result.review] } })
        res.send(updatedMovie)
    }

    if(req.method == "DELETE"){
        const movieId = req.query.movieId;
        const reviewId = req.query.id;
        try {
            const updatedMovie = await Movie.findOneAndUpdate(
              { id: movieId },
              { $pull: { reviews: { _id: reviewId } } },
              { new: true }
            );
                console.log(updatedMovie)
            if (!updatedMovie) {
              return res.status(404).send("Movie not found");
            }
        
            return res.status(200).json(updatedMovie);
          } catch (error) {
            console.error(error);
            return res.status(500).send("Server error");
          }
        }

    if(req.method == "PUT"){
      const movieId = req.query.movieId;
      const reviewId = req.query.id;
      const userEmail = req.query.email
      console.log(userEmail)
      if(req.query.like){
        try {
          const updatedMovie = await Movie.findOneAndUpdate(
            { id: movieId, "reviews._id": reviewId },
            { $inc: { "reviews.$.liked": 1 } },
            { new: true }
          );
          if (!updatedMovie) {
            return res.status(404).send("Movie not found");
          }
          const updateUser = await User.findOneAndUpdate(
            { email: userEmail },
            { $push: { likedReviews: reviewId } },
            { new: true }
          );

          return res.status(200).json(updatedMovie);
        } catch (error) {
          console.error(error);
          return res.status(500).send("Server error");
        }
      }
      if(req.query.dislike){
        const updatedMovie = await Movie.findOneAndUpdate(
          { id: movieId, "reviews._id": reviewId },
          { $inc: { "reviews.$.liked": -1 } },
          { new: true }
        );
        if (!updatedMovie) {
          return res.status(404).send("Movie not found");
        }
        return res.status(200).json(updatedMovie);
      }

    }
}
export default handler