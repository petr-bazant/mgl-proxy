var http = require('http');
var server = http.createServer(function(req, res){
	res.writeHead(301, {'Location' : 'http://www.100pge.com'});
	res.end();
});
server.listen(process.env.PORT || 8085);
