import { Schema, model } from "mongoose"

const productSchema = new Schema({
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
	release_date: { type: Date}
},
	{ timestamps: true }
);

export default model("products", productSchema);
