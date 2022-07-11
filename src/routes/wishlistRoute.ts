import { Router, Request, Response} from "express";
import {  WishlistDBContext } from "../models/Wishlist";
import {authenticateConsumer} from "../middlewares/authenticate";
import jwt, { JwtPayload } from "jsonwebtoken"
const context = new WishlistDBContext();

const wishlistRouter = Router();
export default wishlistRouter

wishlistRouter.get("/index",authenticateConsumer, async (req: Request,res: Response)=>{
  
  try {
    console.log(req.headers);
    
    const payload = jwt.decode(req.headers.token as string) as JwtPayload
    
    
    const wishlist = await context.index(payload.id )
    res.status(200).json(wishlist )
  } catch(err) {
    res.status(400).json({err})
  }
})



wishlistRouter.post("/add/:product_id",authenticateConsumer, async (req: Request,res: Response)=>{
  
    try {
      const payload = jwt.decode(req.headers.token as string) as JwtPayload
      const user_id  = payload.id
      const wishlist = await context.add(req.params.product_id,  user_id)
      res.status(200).json(wishlist)
    } catch(err) {
      res.status(400).json({err})
    }
})
wishlistRouter.delete("/remove/:product_id",authenticateConsumer, async (req: Request,res: Response)=>{
  
	try {
		const payload = jwt.decode(req.headers.token as string) as JwtPayload
		const user_id  = payload.id
		const wishlist = await context.remove(req.params.product_id,  user_id)
		res.status(200).json(wishlist)
	} catch(err) {
		res.status(400).json({err})
	}
})
