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
  let sql = "DROP database IF exists `propertymgmt`;CREATE database `propertymgmt`;  USE `propertymgmt`;  CREATE TABLE `properties` (    `id` INT NOT NULL AUTO_INCREMENT,    `property_address` varchar(50),    `owner_id` INT NOT NULL,    `property_postcode` varchar(5), `property_bedroom` INT,    `property_bathroom` INT,    `property_carpark` INT,    `property_furnish` BOOLEAN NOT NULL,      `property_rent` BOOLEAN NOT NULL,      `property_rentWeek` DECIMAL(6,2),    `property_photo` varchar(500),      `lease_id` int NOT NULL,    PRIMARY KEY (`id`)  );  CREATE TABLE `owners` (    `id` INT NOT NULL AUTO_INCREMENT,    `owner_firstName` varchar(50),    `owner_lastName` varchar(50),    `owner_mobile` varchar(13),    `owner_email` varchar(50),    PRIMARY KEY (`id`)  );  CREATE TABLE `leases` (    `id` int NOT NULL AUTO_INCREMENT,    `leaseStart` DATE NOT NULL,    `leaseEnd` DATE NOT NULL,    `tenant_id` int NOT NULL,    PRIMARY KEY (`id`)  );  CREATE TABLE `tenants` (    `id` int NOT NULL AUTO_INCREMENT,    `tenant_firstName` varchar(50) NOT NULL,    `tenant_lastName` varchar(50) NOT NULL,    `tenant_mobile` varchar(13) NOT NULL,    `tenant_email` varchar(50) NOT NULL,    `lease_id` int NOT NULL,    PRIMARY KEY (`id`)  );  CREATE TABLE `managers` (`id` INT NOT NULL AUTO_INCREMENT,`manager_firstName` VARCHAR(50), `manager_lastName` VARCHAR(50), `manager_mobile` VARCHAR(13), `manager_email` VARCHAR(50), PRIMARY KEY (`id`));  ALTER TABLE`properties` ADD CONSTRAINT`properties_fk0` FOREIGN KEY(`owner_id`) REFERENCES`owners`(`id`); ALTER TABLE`properties` ADD CONSTRAINT`properties_fk1` FOREIGN KEY(`lease_id`) REFERENCES`leases`(`id`); ALTER TABLE`leases` ADD CONSTRAINT`leases_fk0` FOREIGN KEY(`tenant_id`) REFERENCES`tenants`(`id`); INSERT INTO`owners`(`owner_firstName`, `owner_lastName`, `owner_mobile`, `owner_email`) VALUES('John', 'Smith', '+00123456789', 'owner@email.com'); INSERT INTO`tenants`(`tenant_firstName`, `tenant_lastName`, `tenant_mobile`, `tenant_email`, `lease_id`) VALUES('Jane', 'Doe', '+00123456789', 'tenant@email.com', 1); INSERT INTO`leases`(`leaseStart`, `leaseEnd`, `tenant_id`) VALUES('2021-01-01', '2021-12-01', 1); INSERT INTO`properties`(`property_address`, `owner_id`, `property_postcode`, `property_bedroom`, `property_bathroom`, `property_carpark`, `property_furnish`, `property_rent`, `property_rentWeek`, `property_photo`, `lease_id`)   VALUES('The Manson', 1, 46000, 1, 1, 1, true, true, 1000.50, 'https://robbreport.com/wp-content/uploads/2020/01/palazzo-di-amore.jpg', 1); INSERT INTO `managers`(`manager_firstName`,`manager_lastName`,`manager_mobile`,`manager_email`) VALUES('Adam','Avenue',+00987654321,'manager@email.com');"

  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Tables for `propertymgmt` database were successfully created!");

    console.log("Closing...");
  });

  con.end();
});
