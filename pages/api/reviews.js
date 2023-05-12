import Movie from '../../database/schema.movie'
import connect from '../../database/connection'

const handler = async (req, res) => {
    await connect().catch(err => console.log(err))

    if(req.method == "POST"){
        const result = req.body
        console.log(result)
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
            return res.send(newMovie)
        }
    
        const updatedMovie = await Movie.findOneAndUpdate({ id: result.id }, { $push: { reviews: [result.review] } })
        res.send(updatedMovie)
    }
}

export default handler