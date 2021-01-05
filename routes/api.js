var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send("API working");
});

// GET all properties
router.get("/propertymgmt/:table", (req, res) => {
  const table = req.params.table
  db(`SELECT * FROM ${table};`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});


// POST new property
router.post("/propertymgmt", (req, res) => {
  db(
    `INSERT INTO properties(property_address,property_postcode) VALUES(req.body.address,req.body.postcode);`
  )
    .then(results => {
      res.send(results);
      res.send("property details added");
    })
    .catch(err => res.status(500).send(err));
});

// PUT existing property

module.exports = router;
