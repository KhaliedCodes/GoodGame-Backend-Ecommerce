import { Router, Request, Response} from "express";
import { Order, OrderDBContext } from "../models/Order";
import jwt, { JwtPayload } from "jsonwebtoken"
import { validationResult } from "express-validator/src/validation-result";
import { authenticateConsumer } from "../middlewares/authenticate";
const context = new OrderDBContext();

const orderRouter = Router();
export default orderRouter

orderRouter.get("/index",authenticateConsumer, async (req: Request,res: Response)=>{
  
  try {
    const payload = jwt.decode(req.headers.token as string) as JwtPayload
    
    
    const orders = await context.index(payload.id )
    res.status(200).json(orders)
  } catch(err) {
    res.status(400).json({err})
  }
})

orderRouter.get("/:order_id",authenticateConsumer, async (req: Request,res: Response)=>{
  
  try {
    const payload = jwt.decode(req.headers.token as string) as JwtPayload
    
    
    const orders = await context.one(payload.id,req.params.order_id)
    res.status(200).json(orders)
  } catch(err) {
    res.status(400).json({err})
  }
})

orderRouter.post("/complete",authenticateConsumer, async (req: Request,res: Response)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
  try {
    const payload = jwt.decode(req.body.token) as JwtPayload
    const order_id = req.query.order_id as string
    const order = await context.completeOrder(order_id )
    res.status(200).json(order)
  } catch(err) {
    res.status(400).json({err})
  }
})

orderRouter.post("/create",authenticateConsumer, async (req: Request,res: Response)=>{
  
    try {
      const payload = jwt.decode(req.headers.token as string) as JwtPayload
      req.body.user_id = payload.id
      const order = await context.create(req.body as unknown as Order )
      res.status(200).json(order)
    } catch(err) {
      res.status(400).json({err})
    }
})

