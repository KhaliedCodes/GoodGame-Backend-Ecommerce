import dotenv from "dotenv";
import model from "../schemas/Wishlist"

dotenv.config();
export type Wishlist = {
  user_id: String;
  products:Array<String>;
};

export class WishlistDBContext {
  async index(user_id: string){
    try {
      const result = await model.find({user_id:user_id})
      return result;
    } catch (err) {
      throw new Object(err);
    }
  }
  async add(product_id:string, user_id:string) {
    try {
			const res = await model.findOne({user_id:user_id})
			if(res){
				res.products.push(product_id)
				res.products = [...new Set(res.products)]
				res.save()
				return res.products
			}
			const result = await model.create({user_id:user_id, products:[product_id]})
      
      
      

      return result.products;
    } catch (error) {
      throw new Error(`unable to add to wishlist: ${error}`);
    }
  }
  async remove(product_id:string, user_id:string) {
    try {
			const res = await model.findOne({user_id:user_id})
			if(res){
				res.products = res.products.filter(e=>e!=product_id)
				res.save()
				return res.products
			}
      return [];
    } catch (error) {
      throw new Object(error);
    }
  }

}
