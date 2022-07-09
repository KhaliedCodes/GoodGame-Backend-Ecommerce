import { Schema, model } from "mongoose"
import { productSchema } from "./Products";

const wishlistSchema = new Schema({
	user_id: {
		type:String,
		required:true
	},
	products:[productSchema]
},
	{ timestamps: true }
);

export default model("wishlist", wishlistSchema);
