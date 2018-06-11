var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/admin', function(req, res, next) {
  /*res.send('respond with a resource');*/
  res.render('indexs',{model:'admin'});
});

module.exports = router;
