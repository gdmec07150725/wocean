//全局错误处理domain中间件
exports.globalDomain = function(fn,callback){
    //引入domain模块，捕获异步产生的异常
    var domain = require('domain');
    //创建domian对象
    var d = domain.create();
//监听error事件
    d.on('error',function(err){
        //将捕获到的异常信息发送给自定义的错误处理中间件
        console.log('捕获到错误:'+ domain.err);
    });
    d.run(function(){
        fn();
    });
    //调用callback函数
    callback();
};


