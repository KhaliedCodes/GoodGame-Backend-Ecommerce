import dotenv from "dotenv";
import model from "../schemas/Orders"

dotenv.config();
export type Order = {
  id: String;
  user_id: String;
  status: Boolean;
  products:Array<String>;
  note?:String;
};

export class OrderDBContext {
  async index(user_id: string){
    try {
      const result = await model.find({user_id:user_id})
      return result;
    } catch (err) {
      throw new Object(err);
    }
  }
  async one(user_id: string,order_id:string){
    
      const result = await model.findOne({user_id:user_id,_id: order_id}).catch((error)=>{throw new Object(error)})
      return result;
    
  }
  async create(order: Order) {
    try {
      const result = await model.create(order)
      
      

      return result;
    } catch (error) {
      throw new Object(error);
    }
  }


  async completeOrder(order_id: string) {
    try {
      const result = await model.findById(order_id)
      if(result){
        result.status = true
        result.save()
      }
      
      return result;
    } catch (error) {
      throw new Object(error);
    }
  }
}
