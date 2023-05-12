import axios from "axios"

export const getMovies = async() =>{
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=fe81cd2556cf074a1a365d166ccba87c&language=en-US&page=1'
    try{
        const result = await axios.get(url)
        return result.data.results
    }catch(err){
        console.log(err)
    }
}
