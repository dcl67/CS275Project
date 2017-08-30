var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
	clientID: '841527466018472',
	clientSecret: '031c37b13233b812cf6c180a83b40a69',
	callbackURL: "http://localhost:8080/auth/facebook/callback"
},

function(accessToken, refreshToken, profile, cb) {
	return cb(null,profile);
}
));
passport.serializeUser(function(user,cb){
	cb(null,user);
});
passport.deserializeUser(function(obj,cb){
	cb(null,obj);
});

var app = express();
app.use(require('serve-static')(__dirname+'/../../public'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({extended:false}));
app.use(require('express-session')({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());


var mysql=require('mysql');
var con=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'Win/Loss'
});
con.connect(function(err){
	if(err){
		console.log('Cannot connect to database');
		console.log(err);
	}
	else{
		console.log('Connected to database');
	}
});

app.post('/addscore', function (req,res){
	var tableExists=con.query("SELECT * FROM `Win/Loss`.`W/L`;");
	if (!tableExists){
		con.query("CREATE TABLE `W/L` (`User`,`Win/Loss`);",function(err,result){
			if (err){
				console.log("Could not create W/L table!");
				console.log(err);
			}
			else{
				console.log("Table Win/Loss created."); 
			}
		});
	}
	console.log('Adding Score...');
	var winner=req.body;
	//console.log('User: '+user.str+' Winner: '+winner.str);
	console.log('Winner: '+winner.str);
  //var add_winner="INSERT INTO `Win/Loss`.`W/L` (`User`,`Win/Loss`) VALUES ('"+user.str+"','"+winner.str+"');";
	var add_winner="INSERT INTO `Win/Loss`.`W/L` (`Win/Loss`) VALUES ('"+winner.str+"');";
	con.query(add_winner,function(err){
		if(err){
			console.log('Error adding game record!');
			console.log(err);
			res.send('Error adding game record!');
		}
		else{
			console.log("Game record added to database");
			var db_message=res.send("Game record added to database");
			return db_message;
		}
	});
});

app.get('/login',
  function(req, res){
    res.render('login');
  });

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

/*app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });*/

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('Facebook Authentication succeeded!')
    res.redirect('/');
});

app.use(express.static("."))
app.listen(8080, function() {
    console.log("Running on port 8080!");
});

app.get("/", function(req,res) {
  res.render("index.html");
});
