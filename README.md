# Countrypedia

Follow This Instructions below to see my project:

## Build Setup Client

```bash
# install dependencies Client
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
```

## Build Setup Server

```bash
# install dependencies Server
$ npm install

# check config file and customized it based on your pgAdmin

# create new database based on config folder
$ npx sequelize db:create

# create new model for User
$ npx sequelize db:migrate

# create admin data for User Table
$ npx sequelize db:seed:all

# serve with hot reload at localhost:8800
$ nodemon app.js
```