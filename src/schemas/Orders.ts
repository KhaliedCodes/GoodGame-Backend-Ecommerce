import {Schema, model} from "mongoose"

export const orderSchema = new Schema({
    status:{
			type:Boolean,
			required:true
		},
		note: String,
		user_id: {
			type:String,
			required:true
		},
		total_price:Number,
		description:String,
		products:[{product_id:String, quantity:Number}]
  },
  { timestamps: true }
);

export default model("orders", orderSchema);
