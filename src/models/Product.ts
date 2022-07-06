import model from "../schemas/Products"
export type Product = {
  id: String;
  product_name: String;
  price: Number;
  category?: String;
  image?:String;
  description?:String;
  release_date?:Date;
  
};

export class ProductDBContext{
    async index() {
    
        try {
          const result = await model.find({})

          return result;
        } catch (err) {
          throw new Object(err);
        }
      }
      async show(id:string) {
        
        try {

          const result = await model.findById(id)
          return result;
        } catch (err) {
          throw new Object(err);
        }
      }
      async create(p: Product){
        try {
          const product = await model.findOne({name:p.product_name})
          
          if(product){
            product.quantity++
            product.save() 
            return product;
          }

          const result = await model.create({name:p.product_name, price: p.price,category:p.category, quantity: 1,image:p.image,release_date:p.release_date})
          return result
          
    
          
        } catch (err) {
          throw new Object(err);
        }
      }
}