# Storefront Backend Project

## Setup
1. We setup the project by first running  `npm install` to install all the packages
2. We then provide the proper username and password and database in the **database.json** file and the **.env** file, or alternatively create a username and password that corresponds to the ones in the files in the local database.
3. We then run `npx db-migrate db:create full_stack_dev` to create our development database, that will connect on port **5432**.
4. We then run `npx db-migrate up` to run the migrations to create the tables.
5. Now the project is ready for testing and building

## Database
##### Users table
- id  
- username 
- firstname 
- lastname 
- password_digest 

##### Products table
- id 
- product_name 
- price 
- category 

##### Orders table
- id 
- order_status 
- users_id 

##### Order_Products table
- id
- quantity
- order_id
- product_id 

## Models

##### User model
- index: show all users [token required]
- show: show specific user with id [token required]
- create: create a new user with username, password, firstname [optional], lastname [optional]
- authenticate: verifys a user existence in database with username and password and returns a JWT

##### Product model
- index: show all products
- show: show specific product with id
- create: create a product user with name, price, category [optional] [token required]

##### Order model
- index: show all orders for current user [token required]
- create: create a new order for current user with default status "open" [token required]
- addProduct: add products to a specific order for current user with id and quantity and product id [token required]
- completeOrder: updates order status to "completed" for current user with order id [token required]

## Routes/endpoints
### /users route
- /users/index 
required: body: token

- /users/show 
required: body: token , query: id

- /users/create 
required: body: username, password 
optional: body: firstname, lastname

- /users/login
required: body: username, password

### /products route
- /products/index

- /products/show
required: body: id

- /products/create
required: body: token, product_name, price
optional: body: category

### /orders route
- /orders/index
required: body: token

- /orders/complete
required: query: token, order_id

- /orders/create
required: body: token

- /orders/addProduct
required: body: token, productId, quantity , query: id

