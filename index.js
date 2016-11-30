//express lib
var express = require('express');
//general lib
var app = express();
//manages sessions
var session = require('express-session')

app.set('port', (process.env.PORT || 5000));

//use sessions
app.use(session({ 
	secret: 'keyboard cat', 
	resave: false,
  	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}));

app.set('trust proxy', 1) // trust first proxy 

app.get('/', function(request, response) 
{
	var text = "";
	
	if (request.session.user_id!=null) {
		text = 'Hello ' + request.session.user_id;
		response.writeHead(200, {'Content-Type': 'text/html'});	
	}
	else {
    	text = 'You are not authorized to view this page';
		response.writeHead(401, {'Content-Type': 'text/html'});	
  	}
	
    response.end(text);
  	
});

app.get('/login', function(request, response) 
{
	var text = "";
	
	if (request.session.user_id != null) 
	{
		console.log("session: " +  request.session.user_id);
    	text = 'You are already logged in';
  	}
	else
	{
		text = 'logged in';
		request.session.user_id = "Mattia";
    	response.redirect('/my_secret_page');
		
	}
	response.writeHead(200, {'Content-Type': 'text/html'});	
    response.end(text);
});

app.get('/logout', function(request, response) 
{
	var text = "";
	
	if (request.session.user_id !=null) 
	{
    	text = 'logged out';
		request.session.user_id = null;
  	}
	else
	{
		text = 'You are already logged out';
		
	}
	response.writeHead(200, {'Content-Type': 'text/html'});	
    response.end(text);
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
