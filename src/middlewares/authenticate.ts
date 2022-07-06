import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { Request, Response, NextFunction} from "express";

dotenv.config()

export default function authenticate( req : Request, res: Response, next: NextFunction){
    try{
        
        jwt.verify(req.headers.token as string, process.env.TOKEN_SECRET as string)
        next()
    }catch (error) {
        return res.status(401).json({ error });
      }

}