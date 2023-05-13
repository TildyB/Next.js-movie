import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req, res){
    const header = req.headers["authorization"]
    if (!header) return res.status(401)
    const token = header.split(" ")[1]
    if (!token) return res.status(401)
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) return res.status(401)
      res.locals.user = decoded?.id
      return NextResponse.next()
    })
  }

  export const config = {
    matcher:["/api/reviews/reviewer"]
  }
