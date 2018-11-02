# REST API for DLL loading application

 This is the official documentation for REST Web API written in Node.js. The purpose of this API is to serve DLL files via HTTP. 



Available HTTP methods: 

+ GET,
+ POST,
+ PUT - works only in 90%,
+ DELETE.



***

Firstly, a user must be signed-up to use this API. Contact the administrator to register. 

Every route is restricted and must be accessed using JSON Web Token.



## 1. Log-in to API to get the JWT (JSON Web Token).

To log-in, simply execute the POST method to https://twrsquad.pl/api/users/login with JSON body: 

```json
{
    "email": "<your_email_address>",
    "passsword": "<your_password>"
}
```



After doing that request, you'll get the token and the information about its expiration date. 



Sample response:

```json
{
    "message": "Auth successfull!",
    "jwt": {
        "token": "<token>",
        "expires_in": "2 hours"
    }
}
```



After getting the token, you can access every route in API if you pass the token in a request header as follows:

| KEY           | VALUE          |
| ------------- | -------------- |
| Authorization | Bearer <token> |



## 2. Make a request

If you have the token, you can now access a route you desire. 



