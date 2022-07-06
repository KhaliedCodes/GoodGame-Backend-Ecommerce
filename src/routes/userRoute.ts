import { Router, Request, Response } from "express";
import { UserDBContext } from "../models/User";
import jwt from "jsonwebtoken";
import authenticate from "../middlewares/authenticate"
import dotenv from "dotenv"
import {body} from "express-validator"
import { validationResult } from "express-validator/src/validation-result";

dotenv.config()

const context = new UserDBContext();

const userRouter = Router();

userRouter.get("/index",authenticate, async (req: Request, res: Response) => {
  
  const users = await context.index();
  
  
  return res.json(users);
});



userRouter.post("/create",body('username').isLength({min:4, max:20}), 
                body('password').isLength({min:8}),
                body('email').isEmail(), async (req: Request, res: Response) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
  
  
  try {
    const user = await context.create(req.body);
    const token = jwt.sign({id: user.id, username: user.username}, process.env.TOKEN_SECRET as string);
    res.status(201).json(token);
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
    
    const token = jwt.sign({id: user.id, username: user.username}, process.env.TOKEN_SECRET as string);
    res.status(200).json(token);
  } else {
    res.status(400).json({ error: "Login failed" });
  }
});
userRouter.get("/:id",  async (req: Request, res: Response) => {
  
  try {
    
    const user = await context.show(req.params.id as string);
    if(user)
      res.status(200).json(user);
    else
      res.status(400).json({Error: "User not found"})

  } catch (err) {
    return res.status(401).json({ Error: err });
  }
  
});
export default userRouter;
