import {Schema, model} from "mongoose"

export const userSchema = new Schema({
    username: {
      type: String,
			required: true,
			unique: true,
			minLength:4,
			maxLength: 20,

			validate: {
				validator: function(v:string) {
					return /^(?=.{4,20}$)(?![0-9])(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(v);
				},
				message: `Username is not valid `
			}
    },
		password:{
			type:String,
			required:true,
			
		},
    email: {
      type: String,
			required: true,
			unique: true,
			sparse: true,
			trim:true,
			validate: {
				validator: function(v:string) {
					return /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(v);
				},
				message: `Email is not valid `
			}
    

    },
		firstName:String,
		lastName:String,
		phone:{
			type: String,
			sparse: true,
			unique: true,
			validate:{
				validator: (v:string)=>{
					console.log(v);
					
					return v ?/^01[0-2]{1}[0-9]{8}$/.test(v):true
				},
				message:'Phone is not correct'
			}
		},
		role: {type:Number, required: true},
		address:[String]
  },
  { timestamps: true }
);

export default model("users", userSchema);
