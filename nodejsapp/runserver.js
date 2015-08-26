var express = require('express');
var nodemailer = require("nodemailer");
var app = express();
var path = require('path');

app.set('view engine', 'jade');

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
 */
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
	user: "appointmentsystemverify15@gmail.com",
	pass: "Amazatic"
    }
});

/*------------------SMTP Over-----------------------------*/

var id,rand,mailOptions,host,link;

/*------------------Routing Started ------------------------*/

app.use(express.static(path.join(__dirname + '/static')));

app.get('/', function(req, res) {
    res.sendFile('views/index.html', {root: __dirname });
    // console.log(__dirname)
});


app.get('/user/register', function(req, res) {
    res.sendFile('views/index.html', {root: __dirname });
});

app.get('/user/home', function(req, res){
    res.sendFile('views/index.html',{root: __dirname });
});

app.get('/user/profile', function(req, res){
    res.sendFile('views/index.html',{root: __dirname });
});

app.get('/login', function(req, res) {
    res.sendFile('views/index.html', {root: __dirname });
    // console.log(__dirname)
});

app.get('/home', function(req, res) {
    res.sendFile('views/index.html', {root: __dirname });
});

app.get('/user', function(req, res) {
    res.sendFile('views/index.html', {root: __dirname });
});

app.get('/org_register', function(req, res) {
    res.sendFile('views/index.html', {root: __dirname });
});

app.get('/send',function(req,res){
    host=req.get('host');
    link="http://"+host+req.query.link;
    id=req.query.id;
    rand=req.query.rand;
    mailOptions={
	to : req.query.to,
	subject : req.query.subject,
	html : req.query.body+"<br><a href="+link+">Click here</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
	if(error){
	    console.log(error);
	    res.end("error");
	}else{
	    console.log("Message sent: " + response.message);
	    res.end("sent");
	}
    });
});

app.get('/reset_password', function(req, res) {
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
	console.log("Domain is matched. Information is from Authentic email");
	if(req.query.id==id && req.query.pat==rand)
	{
	    id=-1;
	    rand="";
	    console.log("email is verified", rand , id);
            res.sendFile('views/index.html', {root: __dirname });
	}
	else
	{
	    console.log("email is not verified", req.query.id , id);
	    res.end("<h1>Bad Request:Link expired</h1><br> <strong>Please again visit to lost password link from login page.</strong>");
	}
    }
    else
    {
	res.end("<center><h1>Request is from unknown source</h1></center>");
    }
});

app.get('/verify',function(req,res){
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
	console.log("Domain is matched. Information is from Authentic email");
	if(req.query.id==id && req.query.pat==rand)
	{
            console.log("email is verified", req.query.id , id);
            res.sendFile('views/index.html', {root: __dirname });
	}
	else
	{
	    console.log("email is not verified", req.query.id , id);
	    res.end("<h1>Bad Request:Link expired</h1>");
	}
    }
    else
    {
	res.end("<h1>Request is from unknown source");
    }
});


app.get('/user/take_appointment', function(req, res) {
    res.sendFile('views/index.html', {root: __dirname });
});

/*--------------------Routing Over----------------------------*/

    var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Example app listening at http://%s:%s', host, port);
    });

