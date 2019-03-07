var express = require('express');
var app = express();
var proxy = require('http-proxy-middleware');
var fs = require('fs');

const isProduction = process.env.NODE_ENV === 'production';

app.use(express.static('dist'));

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

let port = isProduction?9568:8000;
app.listen(port, function () {
  console.log('server start at '+port);
});