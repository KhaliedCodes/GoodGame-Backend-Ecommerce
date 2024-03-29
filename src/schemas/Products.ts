import mongoose, { Schema, model } from "mongoose"

export const productSchema = new Schema({
	_id: mongoose.Types.ObjectId,
	name: {
		type: String,
		required: true,
		minLength: 2,
		maxLength: 20,
	},
	price: {
		type: Number,
		required: true
	},
	description: String,
	category: [{ type: String, required: true }],
	image: String,
	quantity: { type: Number, required: true },
	release_date: { type: Date},
	videoLink:String,
	rating:{type:Number, min:1, max: 5}

},

	{ timestamps: true }
);

export default model("products", productSchema);
