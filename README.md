
# Secure MySQL API

This TypeScript API serves as a secure bridge for querying MySQL databases.

It uses mysql2 for database interaction and supports parameterized queries to prevent SQL injection attacks. API key authentication ensures that only authorized clients can access the API. Optional advanced security features, such as rate limiting, IP blocking, sensitive data masking, and error monitoring with tools like Sentry, can be easily enabled to protect against abuse and unauthorized access.

Designed for scalability, the API leverages a connection pool to efficiently handle multiple requests. It is configured using environment variables stored in a .env file for flexibility and ease of deployment. The API is ready for production, with optional HTTPS support to ensure secure communication over the network.
## Installation

### (Optional) Edit the source code

Some security settings in the code are commented out, to enable them, head inside "src/index.ts" and remove the comments of the code, you wish to enable.
The explanation of the code is written above.


### 1) Edit the .env file

To run the API, you will need to edit the following environment variables in the .env file

- **API_KEY** `- Replace with your existing/desired API key.`

- **SQL_HOST** `- Set to your MySQL host`

- **SQL_USER** `- Set as your MySQL username - DO NOT use root as your user unless you know, what you're doing`

- **SQL_PASSWORD** `- Set as your account's password`

- **SQL_DB** `- Set as the database, you wish to use`

- **PORT** `- The port you wish to run the API from`



### 2) Install the API with batch/shell script files included

- #### **For Windows based OS:**
    
Run 
```compile
  build.bat
``` 
to install dependencies and compile the code, then 
```initialize
  run.bat
``` 
to start the API.

- #### **For Linux based OS:**

Run 
```compile
  build.sh
``` 
 
to install dependencies and compile the code, then
```initialize
  run.sh
``` 
to start the API.

*`Code was not tested on a Linux based operating system.`*


## Authors

- [`@M1chaelJackson`](https://github.com/M1chaelJackson)

