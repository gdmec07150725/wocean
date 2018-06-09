var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
//引入express-session中间件保存用户信息等数据
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

/*//因为4.x中的flash不再和express捆绑在一起了，所以必须单独安装，再引入进来
var flash = require('connect-flash');*/
/*引入express-partials,创建layout.ejs视图文件需要引入的
var partials  = require('express-partials');*/

var indexs = require('./routes/indexs');
var users = require('./routes/users');
//引入登陆js文件
var login = require('./routes/login');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/*//使用partials模块
app.use(partials());*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//使用express-session中间件,最好在cookieParser后面使用这个中间件
app.use(session({
    secret:'wocean',
    cookie:{maxAge:120000}//定义session过期时间
}));

app.use(flash());
//定义视图助手处理中间件
app.use(function(req,res,next){
    var error = req.flash ('error');
    res.locals.error = error.length ? error : null;
    var success = req.flash('success');
    res.locals.success = success.length ? success : null;
    next();
});
/*
//自定义的错误处理中间件
app.use(function(err,req,res,next){
  //domain捕获到异步发生的异常的时候向客户端发送错误信息
  res.send(500,err.message);
});
*/

app.use('/', indexs);
app.use('/users', users);
app.use('/login',login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
