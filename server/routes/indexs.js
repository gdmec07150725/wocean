
var express = require('express');
var router = express.Router();

/* GET home page.*/
/*router.get('/',checkLogind);*/
router.get('/', function(req, res, next) {
 /* req.flash('success','登录成功');*/
  res.render('indexs');
});
router.get('/store',function(req,res,next){
  res.render('store');
});
function checkLogind (req,res,next){
   //check login
  if(req.session.username){
    return next();
  }else{
    return res.redirect('/login');
  }
}
module.exports = router;

