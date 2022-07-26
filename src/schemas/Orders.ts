import {Schema, model} from "mongoose"
import { productSchema } from "./Products";

export const orderSchema = new Schema({
    status:{
			type:Boolean,
			required:true,
			default:false
		},
		note: String,
		user_id: {
			type:String,
			required:true
		},
		total_price:{type:Number, required:true},
		description:String,
		products:{type:[{product:{type:productSchema, required:true}, amount:{type:Number,required:true}}], required:true, default: undefined}
  },
  { timestamps: true }
);

export default model("orders", orderSchema);
