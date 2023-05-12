import axios from 'axios'
const sendCode = async(code) => {
    // const resp = await axios.post('http://localhost:3004/api/login', {
    const resp = await axios.post('http://localhost:3000/api/login', {
                code
            })
            console.log(resp.data)
    return resp.data;
}
 
export default sendCode;