import connect from '../../../database/connection'
import MovieReview from '../../../database/schema.movie'


const handler = async (req, res) => {
    await connect().catch(err => console.log(err))
    if (req.query.id) {
        const id = parseInt(req.query.id )
        if(!id) return res.status(400).send("Bad request")

        const movie = await MovieReview.findOne({ id })
        if (!movie) return res.status(404).send("Movie not found")
        return res.json(movie)
    }
    res.send("kaka")
}
export default handler