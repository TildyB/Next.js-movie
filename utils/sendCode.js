import axios from 'axios'
const sendCode = async(code) => {
    const resp = await axios.post('https://next-js-movie-tau.vercel.app/api/login', {
                code
            })
    return resp.data;
}
 
export default sendCode;