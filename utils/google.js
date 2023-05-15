const axios = require("axios");
const { z } = require("zod");

const url = "https://oauth2.googleapis.com/token"

const Response = z.object({
    id_token: z.string(),
    access_token: z.string(),
    // refresh_token: z.string(),
    expires_in: z.number(),
    scope: z.string(),
    token_type: z.literal("Bearer")
})



const getIdToken = async (code) => {  
    try {
        const response = await axios.post(url, {
            client_id: process.env.CLIENT_ID,
            client_secret:  process.env.CLIENT_SECRET,
            redirect_uri:  process.env.REDIRECT_URI,
            code,
            grant_type: "authorization_code"
        })
        const result = Response.safeParse(response.data)
        if (result.success === false) {
            console.log("getIDToken safeParse error")
            return null
        }
        return result.data.id_token

    } catch (error) {
        return null
    }
}

export default getIdToken;