# MiShop

An electronic commerce platform which facilitates online transaction of goods.

## Live Demo

Check out the live demo at [mishopp.herokuapp.com](https://mishopp.herokuapp.com/)  
Note: The site may take a few seconds to load since it is running on a free [Heroku Dyno](https://www.heroku.com/dynos).

## Prerequisite

You need to have [Node.js (12+)](https://nodejs.org/en/) installed to run this project

## Setup

- clone the repository

```
git clone https://github.com/bahmi/mishop.git
```

- After cloning the repo, go to its root directory and run the following command to install required packages

```
npm install
```

- Then, go to the **frontend** directory and run `npm install` once again to install all the required packages

- Once all the packages are installed, create a `.env` file at the root directory and fill out with your
  credentials.

```
NODE_ENV = YOUR_NODE_ENVIRONMENT_NAME
PORT = YOUR_NODE_PORT
REDIS_URI = YOUR_REDIS_URI
REDIS_PORT = YOUR_REDIS_PORT
MONGO_URI = YOUR_MONGO_URI
JWT_SECRET = YOUR_JWT_SECRET
PAYPAL_CLIENT_ID = YOUR_PAYPAL_CLIENT_ID
```

- Finally, to run the project simply do

```
npm run dev
```

## Built With

- [React](https://reactjs.org/) - Frontend Library
- [Redux](https://redux.js.org/) - Application State Management Library
- [Express.js](https://expressjs.com/) - Backend Web Framework
- [MongoDB](https://www.mongodb.com/) - NoSQL Database
- [Redis](https://redis.io/) - Cache
- [npm](https://www.npmjs.com/) - Package Manager
- [Bootstrap](https://getbootstrap.com/) - CSS Framework
- [VSCode](https://code.visualstudio.com/) - Code Editor
- [Heroku](https://www.heroku.com/) - Deployment Platform

## To Do

- Migrate from Monolith to Microservices architecture using the Strangler Pattern
- Implement Elasticseacrh to reduce search time
- Implement CI/CD pipeline
