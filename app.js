var http = require('http');
var server = http.createServer(function(req, res){
	if(req.headers['host'].includes('.cz')) {
		res.writeHead(301, {'Location' : 'http://www.100pge.com/cz' + req.headers['host'] + '/czvarianta'});
		res.end(); 
	} else {
		res.writeHead(301, {'Location' : 'http://www.100pge.com/en' + req.headers['host'] + '/envarianta'});
		res.end(); 
	}
});
server.listen(process.env.PORT || 8085);
