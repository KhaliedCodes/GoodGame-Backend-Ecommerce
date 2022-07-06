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
      // const conn = await client.connect();
      // const sql = "SELECT * FROM orders WHERE users_id = $1";
      // const result = await conn.query(sql, [user_id]);
      // conn.release();
      console.log(user_id);
      const result = await model.find({user_id:user_id})
      return result;
    } catch (err) {
      throw new Object(err);
    }
  }
  async create(order: Order) {
    try {
      order.status = false
      const result = await model.create(order)
      
      

      return result;
    } catch (error) {
      throw new Error(`unable to create order: ${error}`);
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
    } catch (err) {
      throw new Error(`unable create order: ${err}`);
    }
  }
}
