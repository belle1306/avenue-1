# Avenue

![Logo](images/)

Avenue is a full stack application that streamlines property information in one place. Built for property managers to service overseas property owners.

## Demo

![Demo](images/)

## To use this app, uou will need to install

- MySQL.
- Node/Express.

## Setup

### Database

Download MySQL.

[Windows](https://dev.mysql.com/downloads/installer/)

[Mac](https://dev.mysql.com/doc/mysql-osx-excerpt/5.7/en/osx-installation.html)

After installing MySQL, go to `.env` file in the avenue directory.

```
DB_NAME=propertymgmt
DB_PASS=YOUR_PASSWORD
```

Replace `YOUR_PASSWORD` with a password that you can remember.

Go to MySQL CLI and type the password that you have created.

(If unable to do so, run the following in the MySQL CLI: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOUR_PASSWORD';` (replace `YOUR_PASSWORD` with a new password))

In the MySQL CLI, type `create database propertymgmt;` to create a database in MySQL.

### Install Dependencies

Run `yarn` in avenue folder to install dependencies related to Express.

Open a **new** terminal window and run `node model/database.js` in avenue root folder. This will create a table called 'properties' in your database.

`cd client` and run `yarn` in client folder to install dependencies related to React. Run `yarn add react`.

### Run Development Servers

- Run `yarn start` in avenue directory to start the Express server on port 5000.

- `cd client` and run `yarn start` to start client server in development mode on port 3000.

- Client is configured so all API calls will be proxied to port 5000 for a smoother development experience. Yay!
- You can test your client app in `http://localhost:3000`
- You can test your API in `http://localhost:5000/api`

## Features

![Features](images/)

## Built With

- MySQL.
- Node/Express.
- Vue.
- Bootstrap.

## Database Schema

![Schema](images/)

## API Routes Plan

![Routes](images/)

## Credit

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
