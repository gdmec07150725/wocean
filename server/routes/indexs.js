
var express = require('express');
var router = express.Router();

/* GET home page.*/
router.get('/',checkLogind);
router.get('/', function(req, res, next) {
 /* req.flash('success','登录成功');*/
  res.render('indexs', { title: 'wocean后台管理系统' });
});
function checkLogind (req,res,next){
   //check login
  if(req.session.username){
    next();
  }else{
    return res.redirect('/login');
  }
}
module.exports = router;

