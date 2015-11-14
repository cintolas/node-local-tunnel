var NLTunnel = require('../index.js'); // require('node-local-tunnel')

var express = require('express'),
	app = express();

var options = {
	remoteHost : 'localhost',	// remote server hostname, e.g example.com
	localBase : 'http://localhost:3001', // local server base url
	path : [ '/foo' ],	// a filter url list to be redirected by the tunnel, set it empty if you want send all requests
	auth : {	// a bypass to identify the requests, only send those fit all values below
		ip:'[::]', 	// come which ip
		hostname:'localhost', // from what host
		'headers.user-agent':'[Chrome]' // example to check if user-agent is Chrome, set any match you want from the request
	},
	ssl: false // no ssl required
} 
// setUp client tunnel 
NLTunnel.client(options)

app.get('/foo',function(req, res, next){
	res.send('ok from 3001')
})
app.get('/foo/:id',function(req, res, next){
	res.redirect('http://baidu.com');
})
app.listen(3001);

