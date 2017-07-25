var express = require('express');
var Inventory=require('../model/Inventory');

var inventoryservice=require('../service/inventory-service');
var router = express.Router();

/* Save the inventory with the details. */
router.post('/save', function(req, res) {
	
	 console.log("inventory save is called ");
	
	 var inventory=new Inventory(req.body.productName,req.body.locationName,req.body.quntity);
	 console.log("Inventory to be saved "+inventory.toString());
	 inventoryservice.saveInventory(inventory); 
	 res.setHeader('Content-Type', 'application/json');
	 res.json(JSON.parse(inventory));
});

/* Get the inventory with inventory Id. */
router.get('/get/:productName', function(req, res) {
	
	 console.log("inventory get is called ");
	 var productName=req.params.productName;
	 console.log("inventory id is "+productName);
	 var inventory=inventoryservice.getInventory(productName);
	 console.log("Got the inventory with product Name "+productName+" is "+JSON.stringify(inventory));
	 
	 res.json(JSON.parse(inventory));
});

module.exports = router;
