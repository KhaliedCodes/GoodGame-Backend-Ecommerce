import bcrypt from "bcrypt";
import dotenv from "dotenv";
import model from '../schemas/Users'
dotenv.config();
export type User = {
  id: string;
  email:String;
  username: String;
  firstname?: String;
  lastname?: String;
  password: String;
};
const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

export class UserDBContext {
  async index() {
    try {
      console.log("Do you come here?");
      const result = await model.find({})
      
      return result;
    } catch (err) {
      throw new Error(err as string);
    }
  }
  async show(id: string) {
    
    try {
      const result = await model.findById(id)
      
      return result;
    } catch (err) {
      throw new Object(err);
    }
  }
  async create(u: User) {
    console.log(u);
    try {
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await model.create({username:u.username,password: hash,email:u.email})


      return result;
    } catch (err) {
      throw new Object(err);
    }
  }
  async authenticate(username: string, password: string) {
    const result = await model.findOne({username: username})
    if(result) {
        const user = result   
        if (bcrypt.compareSync(password+pepper, user.password)) {
          return user
        }
      }

    return null;
  }
}
