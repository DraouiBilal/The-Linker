# About

It is an application simulating a social network that will allow you to discuss with you friends securely using end-to-end encryption.

# Technologies used

1. ***Next.js***

    ![next-js-logo](./images/next-js-logo.png "Next.Js Logo")

2. ***Nest.js***

    ![nest-js-logo](./images/nest-js-logo.png "Nest.Js Logo")

3. ***Bootstrap 5***

    ![bootstrap-5-logo](./images/bootstrap-5-logo.png "bootstrap 5 Logo")

4. ***Socket.io***

    ![socket-io-logo](./images/socket-io-logo.jpg "socket io logo")

5. ***Neo4j***

    ![mongo-db-logo](./images/Neo4j-logo.png "neo4j logo")

6. ***MongoDB***

    ![mongo-db-logo](./images/Mongo-db-logo.png)

# How to start

### Go inside each file

##### run command:

> npm install

to install all the dependencies

for the api folder add a .env file where you should specify the following environment variables:

># neo4j configuration 
>
>NEO4J_PROTOCOL=neo4j
>
>NEO4J_HOST=***\<YOUR_NEO4J_HOST\>***
>
>NEO4J_USERNAME=***\<YOUR_NEO4J_USERNAME\>***
>
>NEO4J_PASSWORD=***\<YOUR_NEO4J_PASSWORD\>***
>
>NEO4J_PORT=***\<YOUR_NEO4J_PORT\>***
>
>NEO4J_DATABASE=***\<YOUR_NEO4J_DATABASE\>***
>
>NEO4J_ENCRYPTION=ENCRYPTION_OFF
>
>
># jwt secret 
>
>JWT_SECRET= ***\<YOUR_JWT_SECRET\>***
>
># mongodb configuration
>
>MONGODB_HOST=***\<YOUR_MONGODB_HOST\>***
>
>MONGODB_PORT=***\<YOUR_MONGODB_PORT\>***
>
>MONGODB_DATABASE=***\<YOUR_MONGODB_DATABASE>***
>
>#rsa secret
>
>RSA_SECRET=***\<YOUR_RSA_SECRET\>*** (used to generate rsa key pair)

### Then Start Neo4j and Mongo DB servers

### Start API using the command:

> npm run start:dev

### Start Client side using the command:

> npm run dev