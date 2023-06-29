
# Project setup in your Local machine
### prequisite for run this project is you should have installed nodeJS, momgoDB and VsCode in you machine if not please install them first.
### After installing all prequisite you just need to clone the project by entering command
```
git clone [URL]
```
### or you can download repository zip file and extract it 
#### Then after this you will see an webelight folder now, open this webelight folder into your VsCode editor no you can open terminal in VsCode and write / paste below command
```
npm i
```
### the above command will install all the required packages for the project.
### Now, your project setup is completed you just need to run this project just write the command in terminal
```
npm run dev
```
### Boom, your project us running now you can do the testing using POSTMAN by seeing api end points.

# Tasks Wise I have devided:
### Task - 1: Project setup [connection with DB and install all neccessary packages].
### Task - 2: vreated & created user signup API [routes ans controller].
### Task - 3: created user login API [routes ans controller] and generated JWT token.
### Task - 4: created middlewares for authentication && isAdmin in that I have varify the token ans pass next().
### Task - 5: created Product schema.
### Task - 6: created all Product required controllers.
### Task - 7: crated all required rotes [did all required pagination task].

### Task - 8: I have tasted all the APIs


# API endpoints

### user / customes APIs
for signup the user
```
https://4000/api/v1/auth/signup  POST
``` 
for login user
```
https://4000/api/v1/auth/login  POST
```
Get all user Pagination [Admin protected route]
```
https://4000/api/v1/auth/getAllCustomer/:page/:limit  GET
```

### Product APIs 
for creating product [Admin protected route]
```
http://localhost:4000/api/v1/product/create  POST
```
Get product by ID
```
http://localhost:4000/api/v1/product/:id  GET
```
Update product by ID [Admin protected route]
```
http://localhost:4000/api/v1/product/update/:id  PUT
```
Delete Product by ID [Admin protected route]
```
http://localhost:4000/api/v1/product/delete/:id  DELETE
```
Get all products 
```
http://localhost:4000/api/v1/product/allProduct/:pages/:limit  GET
```
Filter product by name
```
http://localhost:4000/api/v1/product/filter/byName  GET
```




