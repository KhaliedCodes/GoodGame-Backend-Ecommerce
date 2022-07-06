import {Schema, model} from "mongoose"

const userSchema = new Schema({
    name: {
      type: String,
			required: true,
			minLength:2,
			maxLength: 20,
    },
		price:{
			type:Number,
			required:true
		},
		description:String,
		category:[{type:String, required:true}],
		image:String,
		quantity: {type: Number, required:true}
  },
  { timestamps: true }
);

export default model("products", userSchema);
