/*
 * file: 			router.js
 * description: 	used to route HTTP commands to specific files
 * author: 			Aaron Stannard
 * created: 		8/12/2013
 * last-modified: 	8/12/2013
 */

 var url = require('url');
 require('../util/string');

 /*
  * Router prototype
  */
Router = function (options, fs){
	this.dir = options.dir;
	this.readonly = options.readonly;
	this.logger = options.logger;
	this.fs = fs; //file-system agent
}

 /*
  * Path method - parses the relative file path from the request
  */
Router.prototype.parsePath = function(req){
	return url.parse(req.url).pathname;
}

 /*
  * Output method - writes output to the filestream based on what {fs} returns
  */
Router.prototype.output = function(err, data, res){
	var self = this;
	if(err){
		res.writeHead(err.code, {'Content-Type':'text/plain'});
		var message = JSON.stringify(err.message);
		self.logger.log('HTTP {0} {1}'.format(err.code, message));
		res.end(message);
		return;
	}

	if(data){
		self.logger.log('HTTP {0}'.format(data.code));
		res.writeHead(data.code, {'Content-Type':data.contentType});
		res.end(data.data);
	}
}

 /*
  * Listen method - used to handle incoming requests
  */
Router.prototype.listen = function(req, res){
	var self = this;
	var path = self.parsePath(req);
	self.logger.log("received {0} request for {1} from {2} ({3})".format(req.method, path, req.headers.host, req.headers['user-agent']));
	if(req.method == "GET"){
		self.fs.read(path, req, function(err, data){
			self.output(err, data, res);
		});
	}
}

module.exports.Router = Router;