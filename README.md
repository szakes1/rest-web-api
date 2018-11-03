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

| KEY           | VALUE            |
| ------------- | ---------------- |
| Authorization | Bearer __token__ |



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
{
    "message": "No valid entry was found for a provided ID"
}
```



Or with status code 500:

```json
{
    "error": {
        "message": "Cast to ObjectId failed for value \"5bdce9b10829d603d0f6248g\" at path \"_id\" for model \"DLL\"",
        "name": "CastError",
        "stringValue": "\"5bdce9b10829d603d0f6248g\"",
        "kind": "ObjectId",
        "value": "5bdce9b10829d603d0f6248g",
        "path": "_id"
    }
}
```



## POST

To upload a new DLL you're required to send a multipart form instead of a JSON file. 

You have to add `enctype="multipart/form-data"` to your form to make it work. 



Sample form: 

```html
<form action="https://twrsquad.pl/api/dlls" method="post" enctype="multipart/form-data">
    <input type="text" name="name" />
  <input type="file" name="dllFile" />
</form>
```



To add a new DLL, execute POST request to https://twrsquad.pl/api/dlls as a form with __multipart/form-data__. 



| KEY     | VALUE           |
| ------- | --------------- |
| name    | name_of_the_DLL |
| dllFile | your_DLL_file   |



Sample response after upload: 

```json
{
    "message": "DLL successfully uploaded!",
    "_id": "5bdd8ad668a6d80712e67faa",
    "name": "Nowy pluginek",
    "dllFile": "uploads/1541245654713msdia80.dll",
    "get_info": {
        "type": "GET",
        "description": "Get information about this DLL",
        "url": "https://twrsquad.pl/api/dlls/5bdd8ad668a6d80712e67faa"
    }
}
```





__Don't forget about the token!__



## PUT - works only in 90%, use at own risk!

To update a file you also need to send the multipart form with the keys and values specified above. 



To replace a file, you need to execute a PUT request to https://twrsquad.pl/api/dlls/:dllId with a multipart form. 

Remember that __:dllId__ is an ID of the DLL you want to update. 



It works almost the same as the POST request. 



Sample response:

```json
{
    "message": "File successfully updated!",
    "get_info": {
        "type": "GET",
        "description": "Get information about this DLL",
        "url": "https://twrsquad.pl/api/dlls/5bdce9b10829d603d0f6248b"
    }
}
```



## DELETE

To delete a DLL, you need to execute the DELETE request to https://twrsquad.p/api/dlls/:dllId 

> :dllId is an ID of the DLL you'd like to delete 

It will delete both entry from the database and the file you uploaded. 



Sample response: 

```json
{
    "message": "DLL successfully deleted!",
    "add_new": {
        "type": "POST",
        "description": "Add new DLL using this URL and Schema",
        "url": "https://twrsquad.pl/api/dlls",
        "body": {
            "name": "String",
            "dllFile": "String"
        }
    }
}
```



