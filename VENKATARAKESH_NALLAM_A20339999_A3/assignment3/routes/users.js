var express = require('express');
var router = express.Router();
var db=require('../dbsetup.js');
//displaying the list of users
router.get('/', function(req, res, next) {
db.find ( {}, function(err, docs) {
	res.render('users', { usernames: JSON.stringify(docs) });
});
});

module.exports = router;
