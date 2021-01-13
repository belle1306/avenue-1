require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "propertymgmt",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
 
  //CHANGE SQL variable
  let sql = "DROP database IF exists `propertymgmt`;"
  + "CREATE database propertymgmt;" 
  + "USE propertymgmt;" 
  + "CREATE TABLE `properties` (`property_id` INT NOT NULL AUTO_INCREMENT,`property_address` varchar(50),`tenant_id` INT NOT NULL,`owner_id` INT NOT NULL,`property_postcode` varchar(5),`property_bedroom` INT,`property_bathroom` INT,`property_carpark` INT,`property_furnish` BINARY NOT NULL,`property_photo` blob,PRIMARY KEY (`property_id`));"
  + "CREATE TABLE `tenants` (`tenant_id` INT,`tenant_firstName` varchar(50),`tenant_lastName` varchar(50),`rent` INT,`leaseStart` DATE,`leaseEnd` DATE,`leaseLength` INT,`agreement` longblob,`numOccupant` INT,PRIMARY KEY (`tenant_id`));"
  + "CREATE TABLE `owners` (`owner_id` INT,`owner_firstName` varchar(50),`owner_lastName` varchar(50),`owner_mobile` varchar(13),`owner_email` TEXT,PRIMARY KEY (`owner_id`));"
  + "ALTER TABLE `properties` ADD CONSTRAINT `properties_fk0` FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`tenant_id`);"
  + "ALTER TABLE `properties` ADD CONSTRAINT `properties_fk1` FOREIGN KEY (`owner_id`) REFERENCES `owners`(`owner_id`);"

  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Tables for `propertymgmt` database were successfully created!");

    console.log("Closing...");
  });

  con.end();
});
