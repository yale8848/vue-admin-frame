var express = require('express');
var app = express();
var proxy = require('http-proxy-middleware');
var fs = require('fs');
var path = require('path');
var helmet = require('helmet');
var compression = require('compression')


const PUBLIC_PATH='dist';

const isProduction = process.env.NODE_ENV === 'production';

let port = isProduction?9568:8000;


app.use(helmet());
app.use(compression());

app.use(function (req,res,next) {
	if(req.path==='/'){
		res.send("not find");
	}else{
		next();
	}
},express.static(PUBLIC_PATH));

app.get('/admin', function (req, res) {
	 res.sendFile( path.join(__dirname,PUBLIC_PATH,'index.html'));
});

app.all('*', function (req, res, next) {
	if(!isProduction){
		 res.header('Access-Control-Allow-Origin', '*');
		 res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		 res.header('Access-Control-Allow-Headers', 'token');
		 res.header('Access-Control-Allow-Credentials','true');
	}
  next();
});

app.get('/web-dev/login', function (req, res) {
   let content = fs.readFileSync('./mock/db.json');
	 let mock = JSON.parse(content);
	 res.json(mock.login);
});

app.get('/web-prod/login', function (req, res) {
   let content = fs.readFileSync('./mock/db.json');
	 let mock = JSON.parse(content);
	 res.json(mock.login);
});


var options = {
  target: 'http://gank.io',
  pathRewrite: {
    '^/web-dev/gank': '/api/data/' 
  }
}
app.use('/web-dev/gank',proxy(options))


var options = {
  target: 'http://gank.io',
  pathRewrite: {
    '^/web-prod/gank': '/api/data/' 
  }
}
app.use('/web-prod/gank',proxy(options))

app.listen(port, function () {
  console.log('server start at '+port);
});