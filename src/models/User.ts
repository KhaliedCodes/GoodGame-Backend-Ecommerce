import bcrypt from "bcrypt";
import dotenv from "dotenv";
import model from '../schemas/Users'
dotenv.config();

export type User = {
  id: String;
  email:String;
  username: String;
  firstname?: String;
  lastname?: String;
  password: String;
  phone?:String;
  role: Number;
  address: [String]
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
    
    try {
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await model.create({username:u.username.toLocaleLowerCase(),
                                          password: hash,
                                          email:u.email.toLocaleLowerCase(), 
                                          phone:u.phone,
                                          firstName: u.firstname?.toLocaleLowerCase(),
                                          lastName: u.lastname?.toLocaleLowerCase(),
                                          role:u.role})

      return result;
    } catch (err) {
      throw new Object(err);
    }
  }
  async update(user_id:string, user:User ){


    console.log(user);
    const result = await model.findByIdAndUpdate(user_id,{username:user.username.toLocaleLowerCase(), 
                                                  email:user.email.toLocaleLowerCase(), 
                                                  firstName:user.firstname?.toLocaleLowerCase(), 
                                                  lastName:user.lastname?.toLocaleLowerCase()},{new:true}).catch(err=>{throw new Object(err)})
    
      
    return result

  }
  async authenticate(username: string, password: string) {
    const result = await model.findOne({username: username.toLocaleLowerCase()})
    if(result) {
        const user = result   
        if (bcrypt.compareSync(password+pepper, user.password)) {
          return user
        }
      }

    return null;
  }
}
