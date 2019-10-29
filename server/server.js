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
            console(results);
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
        if(err){
            login = {"login": "error"};
            console.log("LOGIN ERROR");
            console.log(err);
            console.log(JSON.stringify(login));
            res.write(JSON.stringify(login));
            res.end();
            return ;
        }

        if(results.length > 0)
        {
            console.log(results);
            var user = results[0];
            var hashPassword = crypto.createHash("sha512").update(password + user.SALT).digest("hex");
            
            if(hashPassword === user.USER_PW){
                console.log("login success");
                login = {"login": "success"};
            }else{
                console.log("WRONG ID or PASSWORD");
                login = {"login": "wrong"}
            }
            console.log(JSON.stringify(login));
            res.write(JSON.stringify(login));
            res.end();
        }
        else{
            login = {"login": "wrong"}; 
            console.log("WRONG ID")
            console.log(JSON.stringify(login));
            res.write(JSON.stringify(login));
            res.end();
        }
    })
})

// GENERATE-TASK
router.route("/task/generateBIG").post(function(req,res){
    var projectID   = req.body.projectID;
    var BigLevel    = req.body.BigLevel;
    var BigTitle    = req.body.BigTitle;
    var BigStart    = req.body.BigStart;
    var BigEnd      = req.body.BigEnd;
    var BigDesc     = req.body.BigDesc;
    var BigAttach   = req.body.BigAttach;
    var BigStatus   = req.body.BigStatus;
    var BigAuthor   = req.body.BigAutohr;
    var BigCreated  = req.body.BigCreated;
    var BigWeight   = req.body.BigWeight;
    var BigProgress = req.body.BigProgress 
  
 
    console.log(`projectID : ${projectID} , BigLevel : ${BigLevel}, BigTitle : ${BigTitle}, BigStart : ${BigStart} , BigEnd : ${BigEnd}, BigDesc : ${BigDesc}, `
                +`BigAttach : ${BigAttach} , BigStatus : ${BigStatus}, BigAuthor : ${BigAuthor}, BigCreated : ${BigCreated} , BigWeight : ${BigWeight}, BigProgress : ${BigProgress}`);
    
    var data = {PROJ_ID:projectID, BIG_LEVEL:BigLevel, BIG_TITLE:BigTitle, BIG_START:BigStart, BIG_END:BigEnd, BIG_DESC:BigDesc,
                BIG_ATTACHMENT:BigAttach, BIG_STATUS:BigStatus, BIG_AUTHOR:BigAuthor, BIG_CREATED:BigCreated, BIG_WEIGHT:BigWeight, BIG_PROGRESS:BigProgress};
    mysqlDB.query('INSERT INTO POST_BIG set ?', data,function(err,results){
        var admit;
        if(!err){
            admit={"generate":"success"};
            console.log("Generate task success");
            res.write(JSON.stringify(admit));
            res.end();
        }else{
            console.log("TASK INSERT ERROR");
            admit ={"generate":"deny"};
            res.write(JSON.stringify(admit));
            res.end();
        }
    })
})

// GENERATE-TASK-Middle
router.route("/task/generateMID").post(function(req,res){
    var BigID       = req.body.BigID;
    var MidLevel    = req.body.MidLevel;
    var MidTitle    = req.body.MidTitle;
    var MidStart    = req.body.MidStart;
    var MidEnd      = req.body.MidEnd;
    var MidDesc     = req.body.MidDesc;
    var MidAttach   = req.body.MidAttach;
    var MidStatus   = req.body.MidStatus;
    var MidAuthor   = req.body.MidAutohr;
    var MidCreated  = req.body.MidCreated;
    var MidWeight   = req.body.MidWeight;
    var MidProgress = req.body.MidProgress 
  
 
    console.log(`BigID : ${BigID} , MidLevel : ${MidLevel}, MidTitle : ${MidTitle}, MidStart : ${MidStart} , MidEnd : ${MidEnd}, MidDesc : ${MidDesc}, `
                +`MidAttach : ${MidAttach} , MidStatus : ${MidStatus}, MidAuthor : ${MidAuthor}, MidCreated : ${MidCreated} , MidWeight : ${MidWeight}, MidProgress : ${MidProgress}`);
    
    var data = {BIG_ID:BigID, MID_LEVEL:MidLevel, MID_TITLE:MidTitle, MID_START:MidStart, MID_END:MidEnd, MID_DESC:MidDesc,
                MID_ATTACHMENT:MidAttach, MID_STATUS:MidStatus, MID_AUTHOR:MidAuthor, MID_CREATED:MidCreated, MID_WEIGHT:MidWeight, MID_PROGRESS:MidProgress};
    mysqlDB.query('INSERT INTO POST_MID set ?', data,function(err,results){
        var admit;
        if(!err){
            admit={"generate":"success"};
            console.log("Generate task success");
            res.write(JSON.stringify(admit));
            res.end();
        }else{
            console.log("TASK INSERT ERROR");
            admit ={"generate":"deny"};
            res.write(JSON.stringify(admit));
            res.end();
        }
    })
})

// GENERATE-TASK-Middle
router.route("/task/generateSML").post(function(req,res){
    var MidID       = req.body.MidID;
    var SmlLevel    = req.body.SmlLevel;
    var SmlTitle    = req.body.SmlTitle;
    var SmlStart    = req.body.SmlStart;
    var SmlEnd      = req.body.SmlEnd;
    var SmlDesc     = req.body.SmlDesc;
    var SmlAttach   = req.body.SmlAttach;
    var SmlStatus   = req.body.SmlStatus;
    var SmlAuthor   = req.body.SmlAutohr;
    var SmlCreated  = req.body.SmlCreated;
    var SmlWeight   = req.body.SmlWeight;
    var SmlProgress = req.body.SmlProgress 
  
 
    console.log(`MidID : ${MidID} , SmlLevel : ${SmlLevel}, SmlTitle : ${SmlTitle}, SmlStart : ${SmlStart} , SmlEnd : ${SmlEnd}, SmlDesc : ${SmlDesc}, `
                +`SmlAttach : ${SmlAttach} , SmlStatus : ${SmlStatus}, SmlAuthor : ${SmlAuthor}, SmlCreated : ${SmlCreated} , SmlWeight : ${SmlWeight}, SmlProgress : ${SmlProgress}`);
    
    var data = {MID_ID:MidID, SML_LEVEL:SmlLevel, SML_TITLE:SmlTitle, SML_START:SmlStart, SML_END:SmlEnd, SML_DESC:SmlDesc,
                SML_ATTACHMENT:SmlAttach, SML_STATUS:SmlStatus, SML_AUTHOR:SmlAuthor, SML_CREATED:SmlCreated, SML_WEIGHT:SmlWeight, SML_PROGRESS:SmlProgress};
    mysqlDB.query('INSERT INTO POST_Sml set ?', data,function(err,results){
        var admit;
        if(!err){
            admit={"generate":"success"};
            console.log("Generate task success");
            res.write(JSON.stringify(admit));
            res.end();
        }else{
            console.log("TASK INSERT ERROR");
            admit ={"generate":"deny"};
            res.write(JSON.stringify(admit));
            res.end();
        }
    })
})

// PROJECT
router.route("/project/create").post(function(req,res){
    var title = req.body.title;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var desc = req.body.desc;
    
    var data = {
        PROJ_NAME:title,
        PROJ_START:start_date,
        PROJ_END:end_date,
        PROJ_DESC:desc,
        PROJ_PROGRESS:0.00,
        PROJ_STATUS:0
    };

    mysqlDB.query('INSERT INTO PROJECT set ?', data,function(err,results){
        var admit;
        if(!err){
            admit={"create":"success"};
            console.log("PROJECT create success");
            res.write(JSON.stringify(admit));
            res.end();
            console.log(results);
            console.log(results.PROJ_ID);
        }else{
            console.log("PROJECT create fail");
            admit ={"create":"deny"};
            res.write(JSON.stringify(admit));
            res.end();
        }
    })


    var user_id = req.body.user_id;
})

router.route("/project/select").post(function(req,res){ 
    var email = req.body.email;
    
    console.log("======= Proejct Select =======\n");
    console.log("email: "+email);

    mysqlDB.query('select * from ATTENDENCE where USER_ID=?',[email],function(err, results){
        var login;
        if(err){
            login = {"login": "error"};
            console.log("LOGIN ERROR");
            console.log(err);
            console.log(JSON.stringify(login));
            res.write(JSON.stringify(login));
            res.end();
            return ;
        }

        if(results.length > 0)
        {
            console.log(results);
            var user = results[0];
            var hashPassword = crypto.createHash("sha512").update(password + user.SALT).digest("hex");
            
            if(hashPassword === user.USER_PW){
                console.log("login success");
                login = {"login": "success"};
            }else{
                console.log("WRONG ID or PASSWORD");
                login = {"login": "wrong"}
            }
            console.log(JSON.stringify(login));
            res.write(JSON.stringify(login));
            res.end();
        }
        else{
            login = {"login": "wrong"}; 
            console.log("WRONG ID")
            console.log(JSON.stringify(login));
            res.write(JSON.stringify(login));
            res.end();
        }
    })
})