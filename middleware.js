import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

const middleware = (req, res) => {
    const header = req.headers["authorization"]
    if (!header) return res.status(401)
    const token = header.split(" ")[1]
    if (!token) return res.status(401)
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) return res.status(401)
      res.locals.user = decoded?.id
      NextResponse.next()
    })
  }

  export const config = {
    matcher:["/api/*", "/reviews/reviewer","/reviews"]
  }
  export default middleware