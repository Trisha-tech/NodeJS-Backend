# User Authentication & Ecommerce (Backend)


**APP LINK:** ```https://nodejs-backend-1.herokuapp.com```


**Note:** 1. Use **POSTMAN** to check the APIs

2. All APIs are working except [Number 4 (**USER AUTHENTICATION**- ```/platform/new-password``` ] **ISSUE:** {**"error"**:```"Try again session expired."```} --> Can't be able to match sentToken with the resetToken




## 📌 Tech Stack


[![twitter](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://twitter.com/)
[![portfolio](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://katherineoelsner.com/)
[![twitter](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://twitter.com/)
[![twitter](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://twitter.com/)




## 💥 USER AUTHENTICATION


1. **STEPS FOR SIGNUP**

a) Go to the **APP LINK** and type ```/platform/signup```. 

Select ```POST``` method and enter the following details in this format:

```
{
"name":"---",
"email":"---",
"password":"---",
"contactNumber:"---"
}
```

b) Click on ```SEND``` button.

c) On successful signup, a message ```"saved successfully"``` will appear.


2. **STEPS FOR LOGIN**

a) Go to the **APP LINK** and type ```/platform/login```. 

Select ```POST``` method and enter the following details in this format:

```
{
"email":"---",
"password":"---"
}
```


b) Click on ```SEND``` button.

c) On successful login, a unique ```TOKEN``` will appear.


3. **STEPS FOR CHANGE PASSWORD**

a) Go to the **APP LINK** and type ```/platform/changePassword```. 

Select ```POST``` method and enter the following details in this format:

```
{
"email":"---"
}
```


b) Click on ```SEND``` button.


c) A message ```"check your email"``` will appear.


d) Check email in **INBOX** (or **SPAM** if it is not present in INBOX). A link will be there like

```http://localhost:3000/reset/28b0b3c5db86b13d08b760922be0b4283967f5fb299656b8cee6a239c7dd90a7``` where

```resetToken=28b0b3c5db86b13d08b760922be0b4283967f5fb299656b8cee6a239c7dd90a7```


4. **STEPS FOR CHANGE PASSWORD**

a) Go to the **APP LINK** and type ```/platform/new-password```. 

Select ```POST``` method and enter the following details in this format:

```
{
"newPassword":"---",
"sentToken":"---" 
}
```

**Note:** sentToken == resetToken 


b) Click on ```SEND``` button.


c) A message ```"password updated successfully"``` will appear.


5. **STEPS FOR GET ALL USERS**

a) Go to the **APP LINK** and type ```/platform/users```.

b) Select ```GET``` method and Click on ```SEND``` button.

c) ```All the Users``` will appear.


6. **STEPS FOR DELETE USER**

a) Go to the **APP LINK** and type ```/platform/deleteUser/:userId```. 

(Replace ```:userId``` with the value of ```_id``` of that user which is supposed to be deleted which is found on getting all the users)

b) Select ```DELETE``` method and click on ```SEND``` button.


c) A message ```"successfully deleted"``` will appear.



## 💥 E-COMMERCE

1. **STEPS FOR CREATE PRODUCT**

a) Go to the **APP LINK** and type ```/platform/products/create```.

Select ```POST``` method and enter the following details:

```
{
"name":"---",
"brand":"---",
"category":"---",
"countInStock":"---",
"price":"---",
"description":"---"
}
```


b)  Click on ```SEND``` button.

c) ```Product Object``` will appear.


2. **STEPS FOR GET ALL PRODUCTS**

a) Go to the **APP LINK** and type ```/platform/products```.

b) Select ```GET``` method and Click on ```SEND``` button.

c) ```All the Products``` will appear.


3. **STEPS FOR DELETE PRODUCT**

a) Go to the **APP LINK** and type ```/platform/deleteProduct/:productId```. 

(Replace ```:productId``` with the value of ```_id``` of that product which is supposed to be deleted which is found on getting all the products)

b) Select ```DELETE``` method and click on ```SEND``` button.

c) A message ```"successfully deleted"``` will appear.




💙 Thank You !!! 💙


