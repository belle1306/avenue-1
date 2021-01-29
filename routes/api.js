var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");
const hellosign = require('hellosign-sdk')({ key: 'd03242c8f7f36a3fbf83ab0199a7cbaa1811666c7d4a4dc6ddd6ac08b6dc119e' });

router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send("API working");
});

// GET all tables - properties, owners and leases
router.get("/propertymgmt/:table", (req, res) => {
  const table = req.params.table;
  console.log('table>>> ',table);
  db(`SELECT * FROM ${table};`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//Get property and lease details by lease id
// router.get("/propertymgmt/properties/:lease_id", (req, res) => {
//   db(`SELECT * FROM properties INNER JOIN leases ON leases.id = properties.lease_id WHERE properties.lease_id='${req.params.lease_id}';`)
//     .then(results => {
//       res.send(results.data);
//     })
//     .catch(err => res.status(500).send(err));
// });

//Get tenant and lease details by lease id
router.get("/propertymgmt/tenants/:lease_id", (req, res) => {
  db(`SELECT * FROM tenants INNER JOIN leases ON leases.id = tenants.lease_id WHERE leases.id='${req.params.lease_id}';`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//Get owner data by owner id
router.get("/propertymgmt/owners/:id", (req, res) => {
  db(`SELECT * FROM owners INNER JOIN properties ON properties.owner_id = owners.id WHERE properties.owner_id='${req.params.id}';`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// POST new property after user has a choice to select which owner
// populate owner table with fake data
router.post("/propertymgmt/properties", (req, res) => {
  // console.log("---------1-------", req.body.property_address)
  // console.log("----------2------", JSON.stringify(req.body.property_address))
  // console.log("----------3------", JSON.stringify(req.body))
  // const thbody = JSON.stringify(req.body);
  // console.log(thbody.property_address);
  console.log("---THIS IS BEING PASSED----", req.body.property_address,req.body.owner_id)
  const newAddress = req.body.property_address;
  const newOwnerId = req.body.owner_id;
  const newPostcode = req.body.property_postcode;
  const newPhoto = req.body.property_photo;
  const newBedroom = req.body.property_bedroom;
  const newBathroom = req.body.property_bathroom;
  const newCarpark = req.body.property_carpark;
  const newFurnish = req.body.property_furnish;
  const newRent = req.body.property_rent;
  const newRentWeek = req.body.property_rentWeek;

  db(`INSERT INTO properties(property_address, owner_id, property_postcode, property_photo, property_bedroom, property_bathroom, property_carpark, property_furnish, property_rent, property_rentWeek) VALUES(${JSON.stringify(newAddress)},${JSON.stringify(newOwnerId)},${JSON.stringify(newPostcode)},${JSON.stringify(newPhoto)},${JSON.stringify(newBedroom)},${JSON.stringify(newBathroom)}, ${JSON.stringify(newCarpark)}, ${JSON.stringify(newFurnish)}, ${JSON.stringify(newRent)}, ${JSON.stringify(newRentWeek)});`)
    .then(results => {
      res.send(results);
      res.send("posted new property");
    })
    .catch(err => res.status(500).send(err));
});

//DELETE a property
router.delete("/propertymgmt/properties/:property_id", (req, res) => {
  const deleteId = req.params["property_id"];
  db(`DELETE FROM properties WHERE id = ${deleteId};`)
    .then(results => {
      res.send(results);
    })
    .catch(err => res.status(500).send(err));
});

//PUT a property
router.put("/propertymgmt/properties/:property_id", (req, res) => {
  const newId = req.params["property_id"];
  const newAddress = req.body.property_address;
  const newOwnerId = req.body.owner_id;
  const newPostcode = req.body.property_postcode;
  const newPhoto = req.body.property_photo;
  const newBedroom = req.body.property_bedroom;
  const newBathroom = req.body.property_bathroom;
  const newCarpark = req.body.property_carpark;
  const newFurnish = req.body.property_furnish;
  const newRent = req.body.property_rent;
  const newRentWeek = req.body.property_rentWeek;

  db(`UPDATE properties SET property_address = ${JSON.stringify(newAddress)}, owner_id = ${JSON.stringify(newOwnerId)}, property_postcode = ${JSON.stringify(newPostcode)}, property_photo = ${JSON.stringify(newPhoto)}, property_bedroom = ${JSON.stringify(newBedroom)}, property_bathroom = ${JSON.stringify(newBathroom)}, property_carpark = ${JSON.stringify(newCarpark)}, property_furnish = ${JSON.stringify(newFurnish)}, property_rent =  ${JSON.stringify(newRent)}, property_rentWeek = ${JSON.stringify(newRentWeek)} WHERE id = ${JSON.stringify(newId)};`)
    .then(results => {
      res.send(results.data);
      console.log(results.data);
      res.status(200).send("property details updated");
    })
    .catch(err => res.status(500).send(err));
});

//Create signature request
router.post("/callback", (req, res,json) => {
  const data = req.body.json;
  console.log("Input payload of the event-----", data);
  res.status(200).send('Hello API Event Received'); 
  
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const opts = {
    test_mode: 1,
    clientId: 'cc43fe82df8bf9fbea4ca8d26e0995ad',
    title: 'Tenancy Agreement',
    subject: 'You got the best deal',
    message: 'I am glad we agreed',
    signers: [
      {
        email_address: 'lilliantoh1111@gmail.com',
        name: 'Tenant',
      },
      {
        email_address: 'jas4gan@gmail.com',
        name: 'Owner',
      }
    ],
    files: ['Agreement.pdf']
  };
  hellosign.signatureRequest.createEmbedded(opts).then((res) => {
    // handle response
    const signature = res.signature_request.signatures[0];
    const signatureId = signature.signature_id;
    console.log("signature Id", signatureId)
    return hellosign.embedded.getSignUrl(signatureId);
  }).then((res) => {
    console.log('The sign url: ' + res.embedded.sign_url);
  }).catch((err) => {
    // handle error
  });
  
})

module.exports = router;
