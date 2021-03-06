# Avenue

![Landing](support/homepage.PNG)

Avenue is a full stack application that streamlines property information in one place. Built for property managers and property owners.

## Features

- Dynamic analytics dashboard for property manager

![Dashboard](support/dashboard.png)

- Form for new property in a modal

![Form](support/form.png)

- Properties are displayed on a map with popups and markers

![Map](support/map.png)

- Properties under management are listed in a card

![Listing](support/propertylist.png)

- Quick rent calculation tool for property manager

![Calculator](support/calculator2.PNG)

- Property owner can sign tenancy agreement

![HelloSign](support/hellosign.png)

## To use this app, you will need to install

- MySQL.
- Node/Express.

## Setup

### Database

Download MySQL.

[Windows](https://dev.mysql.com/downloads/installer/)

[Mac](https://dev.mysql.com/doc/mysql-osx-excerpt/5.7/en/osx-installation.html)

After installing MySQL, go to `.env` file in the avenue directory.

DB_NAME=propertymgmt
DB_PASS=YOUR_PASSWORD

Replace `YOUR_PASSWORD` with a password that you can remember.

Go to MySQL CLI and type the password that you have created.

(If unable to do so, run the following in the MySQL CLI: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOUR_PASSWORD';` (replace `YOUR_PASSWORD` with a new password))

In the MySQL CLI, type `create database propertymgmt;` to create a database in MySQL.

### AuthO

Sign up with [Auth0](https://auth0.com/docs)

Create an account with Auth0.
Go to Applications and Create Application > Give an App name > Select Single Page Web Applications > Click Create.
Go to Settings > Take your Domain and Client ID; and
Go to `.env` file in client directory and replace as below.

REACT_APP_AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
REACT_APP_AUTH0_CLIENT_ID=YOUR_AUTH0_PASSWORD

Fill in "http://localhost:3000" for all 3 fields: Allowed Callback URLs, Allowed Logout URLs and Allowed Web Origins.

Click Save Changes.

On the browser, go to YOUR_AUTH0_DOMAIN and login from there.

### Install Dependencies

Run `yarn` in avenue folder to install dependencies related to Express.
Run `yarn add hellosign-sdk`, `yarn add cors`, `yarn add express-jwt`,`yarn add helmet`,`yarn add jwks-rsa`.

Open a **new** terminal window and run `node model/database.js` in avenue root folder. This will create a table called 'properties' in your database.

`cd client` and run `yarn` in client folder to install dependencies related to React. Run `yarn add react`, `yarn add react-number-format`, `yarn add react-facebook-login`,`yarn add hellosign-embedded`, `yarn add react-router-dom`,`yarn add @auth0/auth0-react`, `yarn add leaflet`, `yarn add react-leaflet`, `yarn add nivo`, `yarn add @nivo/core @nivo/pie`, `yarn add react-virtualized`,`yarn add react-calendar`,`yarn add moment`, `yarn add react-select`.
For testing:`yarn add jest`,`yarn add enzyme`,`yarn add enzyme-adapter-react-16.1`, `yarn add sinon`,`yarn add prop-types`.

### Run Development Servers

- Run `yarn start` in avenue directory to start the Express server on port 5000.

- `cd client` and run `yarn start` to start client server in development mode on port 3000.

- Client is configured so all API calls will be proxied to port 5000 for a smoother development experience. Yay!
- You can test your client app in `http://localhost:3000`
- You can test your API in `http://localhost:5000/api`

## Built With

- MySQL.
- Node/Express.
- React.
- Bootstrap.

## Database Schema

![Schema](support/db.PNG)

## Credit

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
