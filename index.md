# Node Backend
'Node Backend' is a basic project made to provide one time setup of Nodejs Backend to support Small scale applications.

> The concept behind this Repo is to provide working example of Scalable Nodejs backend.
> You are free to create new Routes, CRUD operations for new collections.

#### What's Inside

Node Backend is a Expressjs based code setup to be integrated with MongoDB, which has

  - Seprated Routes
  - Multi Middlewares
  - Clean and Manageable code


# Getting Started
### Prerequisites

1. MongoDB
2. [nodemon](https://www.npmjs.com/package/nodemon) to run server.js
3. [Expressjs](https://expressjs.com/) to write route and handler code
4. [Mongoose](https://www.npmjs.com/package/mongoose) for collection schema

### Initial Setup

1. Create Database "someDatabase" in MongoDB instance
2. Create three collections : bestseller_books, Users, userCart
3. Pass MongoDB instance connection in `dbconnection.js` file


### Running project(all commands from root of project directory)

```
npm install
nodemon server.js
```

### Files Structure

1. **/controllers** -- API handlers/exontrollers for different routes, containing CRUD operations/verbs like PUT, GET, POST etc
2. **/dbconnection.js** -- contains db connection URL 
3. **/routes** -- Entry points for CRUD verbs where based on verb, handler/controller action is executed
4. **/models** -- Objects containing validation for data, like name:String etc
5. **Server.js** -- main file responsible for calling routes and their corresponding handlers/controllers
6. **Package.json** -- file containing npm dependencies and one start script

## Deployment (Not yet ready, but in my To Do list)

For Heroku Deployment
1. setup mlab on Heroku and get the endpoint
2. In dbconnection.js,  Use MONGODB_URI as MONGODB_URI = 'mongodb://HerokuUsername:HerokuPassword@ds263707.mlab.com:63707/heroku_n399gz4k';
3. For monitoring Mlab from your local system, hit mongo ds263707.mlab.com:63707/heroku_n3996656ty -u username -p password from your local system

### Todos

 - Write MORE Tests
 - Add Night Mode

License
----

MIT

**Free Software, Hell Yeah!**
