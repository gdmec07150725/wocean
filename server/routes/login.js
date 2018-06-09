//用户登录逻辑
var express = require('express');
var app = express();
var router = express.Router();
var crypto = require('crypto');//引入加密模块
//引入user数据库操作模块
var people = require('../models/user');
//引入全局错误处理domain中间件
var domains = require('../errorHandle/domain');

 /*   Get login page*/
router.get('/',function(req,res,next){
    //定向到login页面
    /*console.log('这是登陆界面');*/
    res.render('login',{title:'登陆界面'});

});
router.post('/',function(req,res,next){
    //用户提交登录表单
    //进行登录验证
    var username,
        password;
    //获取用户名和密码并对密码进行加密
    if(req.body.username !==''&& req.body.password !==''){
        username = req.body.username.trim();
        password = req.body.password;
        /*使用md5进行加密处理*/
        var md5 = crypto.createHash('md5');
        /*加密后的密码*/
        var md5password = md5.update(password).digest('base64');
                //查询用户表，看有没有这个用户
                //保存提交上来的username和password
                var user = {
                    username:username,
                    password:md5password
                };
                    //查询user表里面是否有这个管理员
                     people.searchUser(user,function(user){
                            //查询失败,重定向到登陆页
                            if(!user){
                                req.flash('error','用户名或密码错误');
                                return res.redirect('/login');
                            }else{
                            //验证成功,定向到后台首页
                                console.log(user);
                                console.log('验证成功');
                                //用session保存当前用户的username
                                req.session.username = user[0].username;
                                console.log(req.session.username);
                                res.redirect('/');
                              /* res.render('indexs',{title:'首页',user:req.session.username});*/
                         }
                     });
    }
});
module.exports = router;