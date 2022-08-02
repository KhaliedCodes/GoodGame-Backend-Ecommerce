# gg-store Backend Project
## Frontend at https://github.com/MohamedSaleehh/GoodGame-Angular-Ecommerce
## Backend live at https://gg-store.herokuapp.com/
## Frontend live at https://gg-store.netlify.app/#/



## Routes/endpoints
### /users route
- /users/index 
required: headers: token

- /users/:id
required: headers: token

- /users/create 
required: body: username, password 
optional: body: firstname, lastname

- /users/login
required: body: username, password

### /products route
- /products/index

- /products/:id

- /products/create
required: headers: token 
body: product_name, price,category

- /products/delete/:product_id

### /orders route
- /orders/index
required: headers: token

- /orders/:id
required: headers: token

- /orders/complete
required: headers: token, order_id

- /orders/create
required: headers: token
body: order

### /wishlist route
- /wishlist/index
required: headers: token

- /wishlist/create
required: headers: token

- /wishlist/add/:product_id
required: headers: token, 
body: product, quantity 

- /wishlist/remove/:product_id
required: headers: token

