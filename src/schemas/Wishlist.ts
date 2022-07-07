import { Schema, model } from "mongoose"

const wishlistSchema = new Schema({
	user_id: {
		type:String,
		required:true
	},
	products:[String]
},
	{ timestamps: true }
);

export default model("wishlist", wishlistSchema);
