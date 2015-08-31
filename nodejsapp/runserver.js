var express = require('express');
var nodemailer = require("nodemailer");
var app = express();
var path = require('path');
var crypto = require('crypto');
var url  = require('url')
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

function encrypt(text){
    var cipher = crypto.createCipher('aes-256-cbc','d6F3Efeq')
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text){
    var decipher = crypto.createDecipher('aes-256-cbc','d6F3Efeq')
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}
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
    var param_link = req.query.link;
    var split_link = param_link.split("?")
    link="http://"+host+split_link[0]+"?"+encrypt(split_link[1]);
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

	var req_url = req.url;
	var split_url = req_url.split("?");
	var decrypt_url = decrypt(split_url[1]);
	var split_params = decrypt_url.split("&");
	var split_id = split_params[0].split("=");
	var split_pat = split_params[1].split("=");
	
	if(split_id[1]==id && split_pat[1]==rand)
	{
	    console.log("email is verified", rand , id);
            res.sendFile('views/index.html', {root: __dirname });
	}
	else
	{
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
	var req_url = req.url;
	var split_url = req_url.split("?");
	var decrypt_url = decrypt(split_url[1]);
	var split_params = decrypt_url.split("&");
	var split_id = split_params[0].split("=");
	var split_pat = split_params[1].split("=");
	
	if(split_id[1]==id && split_pat[1]==rand)
	{
            console.log("email is verified", req.query.id , id);
            res.sendFile('views/index.html', {root: __dirname });
	}
	else
	{
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

