var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");
const hellosign = require('hellosign-sdk')({
  key: '7150cf6254b928355fb88dd8fb225d385b7c59464ea38df8bd591052391c9307'
});

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
  // console.log("---------1-------", req.body.property_address)
  // console.log("----------2------", JSON.stringify(req.body.property_address))
  // console.log("----------3------", JSON.stringify(req.body))
  // const thbody = JSON.stringify(req.body);
  // console.log(thbody.property_address);
  console.log("---THIS IS BEING PASSED----", req.body.property_address,req.body.owner_id)
  const newAddress = req.body.property_address;
  const newOwnerId = req.body.owner_id;
  const newPostcode = req.body.property_postcode;
  const newBedroom = req.body.property_bedroom;
  const newBathroom = req.body.property_bathroom;
  const newCarpark = req.body.property_carpark;
  const newFurnish = req.body.property_furnish;
  const newRent = req.body.property_rent;
  const newRentWeek = req.body.property_rentWeek;

  db(`INSERT INTO properties(property_address, owner_id, property_postcode, property_bedroom, property_bathroom, property_carpark, property_furnish, property_rent, property_rentWeek) VALUES(${JSON.stringify(newAddress)},${JSON.stringify(newOwnerId)},${JSON.stringify(newPostcode)},${JSON.stringify(newBedroom)},${JSON.stringify(newBathroom)}, ${JSON.stringify(newCarpark)}, ${JSON.stringify(newFurnish)}, ${JSON.stringify(newRent)}, ${JSON.stringify(newRentWeek)});`)
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
  const newBedroom = req.body.property_bedroom;
  const newBathroom = req.body.property_bathroom;
  const newCarpark = req.body.property_carpark;
  const newFurnish = req.body.property_furnish;
  const newRent = req.body.property_rent;
  const newRentWeek = req.body.property_rentWeek;

  db(`UPDATE properties SET property_address = ${JSON.stringify(newAddress)}, owner_id = ${JSON.stringify(newOwnerId)}, property_postcode = ${JSON.stringify(newPostcode)}, property_bedroom = ${JSON.stringify(newBedroom)}, property_bathroom = ${JSON.stringify(newBathroom)}, property_carpark = ${JSON.stringify(newCarpark)}, property_furnish = ${JSON.stringify(newFurnish)}, property_rent =  ${JSON.stringify(newRent)}, property_rentWeek = ${JSON.stringify(newRentWeek)} WHERE id = ${JSON.stringify(newId)};`)
    .then(results => {
      res.send(results.data);
      console.log(results.data);
      res.status(200).send("property details updated");
    })
    .catch(err => res.status(500).send(err));
});

//Signature
const opts = {
  test_mode: 1,
  clientId: 'e8bef94dd5a2e23cf4e32bfd9de4fd4a',
  template_id: 'b0ee832977d76cc3240364e0287ccfd1544bb454',
  subject: 'The NDA we talked about',
  message: 'Please sign this NDA and then we can discuss more. Let me know if you have any questions.',
  signers: [
    {
      email_address: 'jas4gan@gmail.com',
      name: 'Alice',
      role: 'subject'
    }
  ],
  custom_fields: {
    organization_name: 'ACME Co.',
    shoot_type: 'Hand model',
    location: 'Cozumel, Mexico'
  }
};

/*hellosign.signatureRequest.createEmbeddedWithTemplate(opts).then((res) => {
  // handle response
}).catch((err) => {
  // handle error
});
 const opts = {
  test_mode: 1,
  clientId: 'e8bef94dd5a2e23cf4e32bfd9de4fd4a',
  subject: 'NDA with Acme Co.',
  message: 'Please sign this NDA and then we can discuss more.?',
  
  signers: [
    {
      email_address: 'jas4gan@gmail.com',
      name: 'Jas'
    },
    {
      email_address: 'jaseslin@gmail.com',
      name: 'Jaseslin'
    }
  ],
  files: ['Agreement.pdf','Agreement2.pdf']
}; */
// let signatureId = "";
hellosign.signatureRequest.createEmbedded(opts).then((res) => {
  // handle response
 /*  console.log("are you here?", res.signature_request);
  signatureId = res.signature_request.signature_request_id;
  return signatureId;
})
  .then(data => {
    hellosign.embedded.getSignUrl(data).then((res) => {
      console.log('The sign url is: ' + res.embedded.sign_url);
    }).catch((err) => {
      // handle error
    });
  })
  .catch((err) => {
  // handle error
  console.log(err);
}); */
console.log("are you here?", res.signature_request);
  const signature = res.signature_request.signatures[0];
  const signatureId = signature.signature_id;

  return hellosign.embedded.getSignUrl(signatureId);
}).then((res) => {
  console.log('The sign url: ' + res.embedded.sign_url);
}).catch((err) => {
  // handle error
});
// const hellosign = require('hellosign-sdk')({ key: '7150cf6254b928355fb88dd8fb225d385b7c59464ea38df8bd591052391c9307' });



module.exports = router;
