import connect from '../../database/connection'
import User from '../../database/schema.user'
import jwt from 'jsonwebtoken'



const handler = async (req, res) => {
    await connect().catch(err => console.log(err))
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send('Missing authorization header');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).send('Missing token');
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({sub: decoded.user.sub});
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send({ name: user.name });
    } catch (error) {
      console.error(error);
      res.status(401).send('Invalid token');
    }
  };

export default handler