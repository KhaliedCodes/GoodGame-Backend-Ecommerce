import { Router, Request, Response } from "express";
import { ProductDBContext } from "../models/Product";
import {body} from "express-validator"
import { validationResult } from "express-validator/src/validation-result";
import {  authenticateConsumer } from "../middlewares/authenticate";
const context = new ProductDBContext();

const productRouter = Router();
export default productRouter

productRouter.get("/index", async (req: Request, res: Response) => {
  
    const products = await context.index();
    console.log(req.headers.token);
    
    res.json(products);
  });
  
  productRouter.get("/:id", async (req: Request, res: Response) => {

    try {
      
      const product = await context.show(req.params.id as string);
      if(product)
        res.status(200).json(product);
      else
        res.status(400).json({Error: "Product not found"})
  
    } catch (err) {
      return res.status(400).json({ Error: err });
    }
    
  });


productRouter.post("/create",authenticateConsumer,body('price').isNumeric(), async (req: Request,res: Response)=>{
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

productRouter.delete("/delete/:product_id",authenticateConsumer, async (req: Request,res: Response)=>{
    try {
      const removedProduct = await context.delete(req.params.product_id)
      res.status(200).json(removedProduct)
    } catch(err) {
      res.status(400).json({err})
    }
})