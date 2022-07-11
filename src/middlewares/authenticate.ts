import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv"
import { Request, Response, NextFunction} from "express";

dotenv.config()

export  function authenticateConsumer( req : Request, res: Response, next: NextFunction){
    try{
        jwt.verify(req.headers.token as string, process.env.TOKEN_SECRET as string,(err,decoded)=>{
            if(err){
                return res.status(401).json({err});
            }
            const code = (decoded as JwtPayload)?.role?.code
    
            
            
            if(code == 0 || code == 2){
                
                next()
            }else{
                
                throw new Object({message:"You do not have access"})
            }
            
        })
    }catch(err){
        return res.status(401).json({err});
    }
}

export function authenticateAdmin( req : Request, res: Response, next: NextFunction){
    try{
        jwt.verify(req.headers.token as string, process.env.TOKEN_SECRET as string,(err,decoded)=>{
            console.log(decoded);
            if(err){
                return res.status(401).json({err});
            }
            const code = (decoded as JwtPayload)?.role?.code
    
            
            
            if(code == 2){
                
                next()
            }else{
                
                throw new Object({message:"You do not have access"})
            }
            
        })
    }catch(err){
        return res.status(401).json({err});
    }

}




const mama = 0
export default mama 