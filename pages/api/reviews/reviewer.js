import connect from "../../../database/connection"
import Movie from "../../../database/schema.movie"


const handler = async (req, res) => {
    await connect().catch(err => console.log(err))
        if (req.query.name) {
            const name = req.query.name
            // User.find({ username: {$regex : "^" + req.params.username}});
            const movies = await Movie.find({ "reviews.reviewer": {$regex : "^" + name} })
            console.log(movies)
            if (!movies.length) return res.status(404)
            return res.send(movies)
        }
        res.send([])
}
export default handler