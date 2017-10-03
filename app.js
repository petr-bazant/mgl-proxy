var http = require('http');
var server = http.createServer(function(req, res){
	res.writeHead(301, {'Location' : 'http://en.mygreenlife.info'});
	res.end();
});
server.listen(process.env.PORT || 8086);
