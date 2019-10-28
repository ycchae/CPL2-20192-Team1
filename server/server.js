//package.json은 외장모듈 관리를 위해 사용(npm init)
var http = require('http')
var express = require('express')
var static = require('serve-static')
var path = require('path')
var bodyParser = require('body-parser')
var multer = require('multer')
var fs = require('fs')
var cors = require('cors') // 다른 서버로 접근하기위해서 사용
var mysql = require('mysql');
var crypto = require('crypto'); //비밀번호 암호화
var mysqlDB = require('./mysql-db');

mysqlDB.connect();

var app = express();
app.set('port',process.env.PORT || 9000); //포트 지정
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //post방식으로 데이터 받기위해 2줄 적어야한다
app.use(cors());

var storage = multer.diskStorage({
    destination : function(req,file,callback){
        callback(null,'public')
    }, //파일위치 정하기
    filename : function(req,file,callback){
       var extension = path.extname(file.originalname); //확장자
       var basename = path.basename(file.originalname,extension); //확장자 뺀 파일이름
       callback(null,basename+Date.now()+extension);
    } //파일이름 정하기
})

var upload = multer({
    storage : storage,
    limits:{
        files:10,
        fileSize:1024*1024*1024
    }
});

var router = express.Router();
app.use('/',router);

app.use(function(req,res,next){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf8'})
    res.write(`<h3>해당하는 내용이 없습니다</h3>`)
    res.end();
})

http.createServer(app).listen(app.get('port'),function(){
    console.log("익스프레스로 웹 서버를 실행함 : "+ app.get('port'));
}) //express를 이용해 웹서버 만든다


// SIGNUP
router.route("/user/register").post(function(req,res){
    var email = req.body.email;
    var inputPassword = req.body.password;
    var u_name = req.body.name;
    var department = req.body.department;
    var u_salt = Math.round((new Date().valueOf() * Math.random())) + "";
    var hashPassword = crypto.createHash("sha512").update(inputPassword + u_salt).digest("hex");
    console.log(`email : ${email} , password : ${inputPassword}, hashPassword : ${hashPassword}, name : ${u_name} , department : ${department}, salt : ${u_salt}`);
    
    var data = {USER_ID:email, USER_PW:hashPassword, NAME:u_name, DEPT:department, TOKEN:"t", SALT:u_salt};
    mysqlDB.query('INSERT INTO USER set ?', data,function(err,results){
        var admit;
        if(!err){
            admit={"register":"success"};
            console.log("Create user success");
            res.write(JSON.stringify(admit));
            res.end();
        }else{
            console.log("USER INSERT ERROR");
            admit ={"register":"deny"};
            res.write(JSON.stringify(admit));
            res.end();
        }
    })
})
// LOGIN
router.route("/user/login").post(function(req,res){ 
    var email = req.body.email;
    var password = req.body.password;
    console.log("email : "+email);
    console.log("password : "+password);

    mysqlDB.query('select * from USER where USER_ID=?',[email],function(err, results){
        var login;
        if(!err)
        {
            console.log(results);
            var user = results[0];
            var hashPassword = crypto.createHash("sha512").update(password + user.SALT).digest("hex");
            
            if(hashPassword === user.USER_PW){
                console.log("login success");
                login = {"login": "ok"};
            }else{
                console.log("WRONG ID or PASSWORD");
                login = {"login": "wrong"}
            }
            console.log(JSON.stringify(login));
            res.write(JSON.stringify(login));
            res.end();
        }
        else if(!results[0]){
            login = {"login": "wrong"}; 
            console.log("WRONG ID")
            console.log(JSON.stringify(login));
            res.write(JSON.stringify(login));
            res.end();
        }
        else{
            login = {"login": "error"};
            console.log("LOGIN ERROR");
            console.log(err);
            console.log(JSON.stringify(login));
            res.write(JSON.stringify(login));
            res.end();
        }
    })
})