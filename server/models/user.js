//连接mongoDB数据库
var mongoose = require('mongoose');
//连接数据库成功后的回调函数
var Schema = mongoose.Schema;
var userSchema = new Schema({
        username:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        }
});
    //连接myDatabase数据库,Mongoose>=4.0要输入第二个参数useMongoClient.不然会报过时的警告
mongoose.connect('mongodb://localhost:27017/wocean',{useMongoClient:true},function(err){
        if(err) throw(err);
        else{
            console.log('连接数据库成功');
        }
});
//创建users表
var Users = mongoose.model('users',userSchema);
//查询user表数据
exports.searchUser = function(user,callback){
        Users.find(user,function(err,user){
            if(err) throw err;
            else{
                if(user.length !== 0){
                    callback(user);
                //查询失败
                }else{
                    callback(null);
                }
            }
        })
    };
exports.createUser = function (user,callback){
    Users.create(user,function(err){
        if(err) throw  err;
        else{
            callback(null);
        }
    })
};


