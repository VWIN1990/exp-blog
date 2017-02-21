var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send('hello , use root directory.');
});

router.get('/:name', function(req, res) {
	//res.send('hello1, '+req.params.name);
	res.render('user', {
		name: req.params.name
	});
});


module.exports = router;