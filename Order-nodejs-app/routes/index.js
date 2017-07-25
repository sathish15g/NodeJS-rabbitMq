var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("home is called");
    res.setHeader('Content-Type', 'application/json');
    res.write("Welcome to APP PES order  API");
});

module.exports = router;
