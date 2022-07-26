import { Router, Request, Response } from "express";
import { User, UserDBContext } from "../models/User";
import jwt from "jsonwebtoken";
import {authenticateAdmin, authenticateConsumer} from "../middlewares/authenticate"
import dotenv from 'dotenv'
import {body} from "express-validator"
import { validationResult } from "express-validator/src/validation-result";
import { roles } from "../interfaces/role";

dotenv.config()

const context = new UserDBContext();

const userRouter = Router();

userRouter.get("/index",authenticateAdmin, async (req: Request, res: Response) => {
  
  const users = await context.index();
  
  
  return res.status(201).json({users});
});



userRouter.post("/create",body('username').isLength({min:4, max:20,}), 
                body('password').isLength({min:8}),
                body('email').isEmail(),
                body('role').isInt({min:0, max:2}), async (req: Request, res: Response) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
  
  
  try {
    const user = await context.create(req.body);
    if(user){
      const token = jwt.sign({id: user.id, username: user.username, role:roles[user.role]}, process.env.TOKEN_SECRET as string);
      const user_info = {id:user._id,username: user.username, email:user.email, role: roles[user.role].role }
      res.status(201).json({token,user_info});
    }
      
    
    
  } catch (err) {
    res.status(400).json(err);
  }
});
userRouter.post("/login",body('username').isLength({min:5, max:20}), body('password').isLength({min:8}), async (req: Request, res: Response) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
  
  const username = req.body.username;
  const password = req.body.password;

  const user = await context.authenticate(username, password);
  if (user) {
    
    
    if(!req.body.rememebered){
      const token = jwt.sign({id: user.id, username: user.username, role:roles[user.role]}, process.env.TOKEN_SECRET as string,{expiresIn:60*60});
      const user_info = {id:user._id,username: user.username, email:user.email, role: roles[user.role].role }
      res.status(201).json({token,user_info});
    }else{
      const token = jwt.sign({id: user.id, username: user.username, role:roles[user.role]}, process.env.TOKEN_SECRET as string);
      const user_info = {id:user._id,username: user.username, email:user.email, role: roles[user.role].role }
      res.status(201).json({token,user_info});
    }
    
  } else {
    res.status(400).json({ error: "Login failed" });
  }
});

userRouter.patch("/:id", authenticateConsumer, async (req: Request, res: Response) => {
  
  try {
    
    const user = await context.update(req.params.id as string,req.body as unknown as User);
    if(user)
      res.status(200).json(user);
    else
      res.status(400).json({Error: "User not found"})

  } catch (err) {
    return res.status(401).json(err);
  }
  
});

userRouter.get("/:id", authenticateConsumer, async (req: Request, res: Response) => {
  
  try {
    
    const user = await context.show(req.params.id as string);
    if(user)
      res.status(200).json(user);
    else
      res.status(400).json({Error: "User not found"})

  } catch (err) {
    return res.status(401).json(err);
  }
  
});
export default userRouter;
