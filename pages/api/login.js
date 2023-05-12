import connect from '../../database/connection'
import MovieReview from '../../database/schema.movie'
import  getIdToken  from '../../utils/google'
import jwt from 'jsonwebtoken'
import User from '../../database/schema.user'
import safeParseFc from '../../utils/safeParseFc'
import z from 'zod'


const Payload = z.object({
    name: z.string(),
    sub: z.string(),
    email: z.string().email(),
  });


const handler = async (req, res) => {
  console.log("itt van")
    await connect().catch(err => console.log(err))
    if (req.method == "POST"){
    const loginRequest = req.body
    console.log(loginRequest)
    const idToken = await getIdToken(loginRequest.code);
    if (!idToken) return res.status(401).send("Unauthorized");
    const payload = jwt.decode(idToken);
    const result = safeParseFc(Payload, payload);
  
    if (!result) {
      return res.sendStatus(500).send("Internal Server Error");
    }
    
    const data = result
    const user = await User.findOne({sub: data.sub})
  
    
    if (!user) {
      const newUser = await User.create(data) 
      const sessionToken = jwt.sign({newUser}, process.env.JWT_SECRET);
      return res.send({sessionToken, username: newUser.name});
    }  
    const sessionToken = jwt.sign({user}, process.env.JWT_SECRET);
    res.send({sessionToken, username: user.name});
}
}
export default handler