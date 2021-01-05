var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send("API working");
});

// GET all tables - properties, owners and leases
router.get("/propertymgmt/:table", (req, res) => {
  const table = req.params.table;
  db(`SELECT * FROM ${table};`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// POST new property after user has a choice to select which owner
// populate owner table with fake data
router.post("/propertymgmt/properties", (req, res) => {
  const table = req.params.table;
  db(
    `INSERT INTO ${table}(property_address,property_postcode) VALUES(req.body.address,req.body.postcode);`
  )
    .then(results => {
      res.send(results);
      res.send("posted new property");
    })
    .catch(err => res.status(500).send(err));
});

// PUT existing property

module.exports = router;
