import { Router, Request, Response } from "express";
import { ProductDBContext } from "../models/Product";
import authenticate from "../middlewares/authenticate";
import {query,body} from "express-validator"
import { validationResult } from "express-validator/src/validation-result";
const context = new ProductDBContext();

const productRouter = Router();
export default productRouter

productRouter.get("/index", async (req: Request, res: Response) => {
  
    const products = await context.index();
    res.json(products);
  });
  
  productRouter.get("/show", query('id').isNumeric(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    try {
      
      const product = await context.show(req.query.id as string);
      if(product)
        res.status(200).json(product);
      else
        res.status(400).json({Error: "Product not found"})
  
    } catch (err) {
      return res.status(400).json({ Error: err });
    }
    
  });


productRouter.post("/create",authenticate,body('price').isNumeric(), async (req: Request,res: Response)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
    try {
      const addedProduct = await context.create(req.body)
      res.status(200).json(addedProduct)
    } catch(err) {
      res.status(400).json({err})
    }
})