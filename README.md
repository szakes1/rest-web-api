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



## 2. Make a request: GET, POST, PUT, DELETE

If you have the token, you can now access a route you desire. 



## GET

#### View available DLLs

To view available DLLs, execute GET request to https://twrsquad.pl/api/dlls with a provided token as a request header.



Sample response:

```json
{
    "number_of_dlls": 2,
    "dlls": [
        {
            "name": "Keylogger",
            "dllFile": "uploads/1541204401772adodb.dll",
            "_id": "5bdce9b10829d603d0f6248b",
            "get_info": {
                "type": "GET",
                "description": "Get information about this DLL",
                "url": "https://twrsquad.pl/api/dlls/5bdce9b10829d603d0f6248b"
            },
            "download_file": {
                "type": "GET",
                "description": "Download DLL file using this URL",
                "url": "https://twrsquad.pl/api/uploads/5bdce9b10829d603d0f6248b"
            }
        },
        {
            "name": "Plug-in",
            "dllFile": "uploads/1541204512156msdia80.dll",
            "_id": "5bdcea200829d603d0f6248c",
            "get_info": {
                "type": "GET",
                "description": "Get information about this DLL",
                "url": "https://twrsquad.pl/api/dlls/5bdcea200829d603d0f6248c"
            },
            "download_file": {
                "type": "GET",
                "description": "Download DLL file using this URL",
                "url": "https://twrsquad.pl/api/uploads/5bdcea200829d603d0f6248c"
            }
        }
    ]
}
```





If there are no DLLs, you will see a response like that:

```json
{
    "number_of_dlls": 0,
    "dlls": []
}
```



### View one DLL

To view one DLL, execute GET request to https://twrsquad.pl/api/dlls/:dllId with a token as a request header.

> :dllId is in fact an ID of a DLL



Sample response: 

```json
{
    "dll": {
        "_id": "5bdce9b10829d603d0f6248b",
        "name": "Keylogger",
        "dllFile": "uploads/1541204401772adodb.dll"
    },
    "get_info": {
        "type": "GET",
        "description": "Get information about this DLL",
        "url": "https://twrsquad.pl/api/dlls/5bdce9b10829d603d0f6248b"
    },
    "download_file": {
        "type": "GET",
        "description": "Download DLL file using this URL",
        "url": "https://twrsquad.pl/api/uploads/5bdce9b10829d603d0f6248b"
    }
}
```



If the DLL was not found, it will throw an error with status code: 404. 

```json

```



