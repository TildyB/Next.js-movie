import axios from 'axios'
const sendCode = async(code) => {
    // const resp = await axios.post('http://localhost:3004/api/login', {
    const resp = await axios.post('https://next-js-movie-tau.vercel.app/api/login', {
                code
            })
            console.log(resp.data)
    return resp.data;
}
 
export default sendCode;