//CITATION: This application was created with the help of sample code from LECTURE 12 and LECTURE 14
var DataStore = require("nedb");
var db=require('../dbsetup.js');

var express = require('express');
var router = express.Router();
var userdb;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Teen Connect Chat Application' });
});

//post redirection to chat
router.post('/', function (req, res) {
	userdb={name:req.body.name}
	//adding users to the ned db
	db.insert(userdb, function(err, savedMesh) {
	});
    res.render('chat', { username: req.body.name, heading: 'TEEN CONNECT CHAT APPLICATION'  });	
});

//post redirection to users page
router.post('/users', function (req, res) {
db.find ( {}, function(err, docs) {
	//passing the object to users page to display the list of users
	res.render('users', { usernames: JSON.stringify(docs),heading:"LIST OF LOGGED IN USERS",main: 'TEEN CONNECT CHAT APPLICATION' });
});
});


	

module.exports = router;
