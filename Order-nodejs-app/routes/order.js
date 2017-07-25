var express = require('express');
var Product=require('../model/Order');

var orderservice = require('../service/order-service');
var router = express.Router();

/* Save the order with the details. */
router.post('/save', function(req, res) {

    console.log("product save is called ");

    var order=new Product(req.body.orderID,req.body.clientId,req.body.productName,req.body.locationName,req.body.quantity);
    console.log("Order to be saved "+order.toString());
    orderservice.saveOrder(order);
    res.setHeader('Content-Type', 'application/json');
    res.json(JSON.parse(order));
});

/* Get the order with order Id. */
router.get('/get/:orderID', function(req, res) {

    console.log("order get is called ");
    var orderID=req.params.orderID;
    console.log("order id is "+orderID);
    var order=orderservice.getOrder(orderID);
    console.log("Got the order with order id "+orderID+" is "+JSON.stringify(order));

    res.json(JSON.parse(order));
});

module.exports = router;
