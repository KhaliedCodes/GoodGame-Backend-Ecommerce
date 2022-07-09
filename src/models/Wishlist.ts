import dotenv from "dotenv";
import { ObjectId } from "mongoose";
import model from "../schemas/Wishlist"
import productModel from "../schemas/Products"
import { Product } from "./Product";

dotenv.config();
export type Wishlist = {
  user_id: String;
  products:Array<String>;
};

export class WishlistDBContext {
  async index(user_id: string){
    try {
      const result = await model.findOne({user_id:user_id})
      return result?.products;
    } catch (err) {
      throw new Object(err);
    }
  }
  async add(product_id:string, user_id:string) {
    try {
      const product = await productModel.findById(product_id)
      
      
      
      if(product){
        const wishlist = await model.findOne({user_id:user_id})
        if(wishlist){
          const res = wishlist.products.find(e=> e._id == product_id as unknown)
          if(res){
          
            return wishlist.products
          }
          await wishlist.updateOne({$push:{products:product}})
          const result = await model.findOne({user_id:user_id})
           
          return result?.products
        }
        

        console.log("You come here??");
        
        const result = await model.create({user_id:user_id, products:[product]})
        return result.products;
      }else{
        throw new Object({message: "Product does not exist"});
      }
      
    } catch (error) {
      throw new Object({message: "Product does not exist"});
    }
  }
  async remove(product_id:string, user_id:string) {
    try {
			const res = await model.findOne({user_id:user_id})
      
			if(res){
				res.products = res.products.filter(e=>e._id!=(product_id as unknown))
				res.save()
				return res.products
			}
      return [];
    } catch (error) {
      throw new Object(error);
    }
  }

}
