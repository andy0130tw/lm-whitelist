var express = require('express');
var market = require('./lmmarket');
var app = express();

app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/public'));

app.get('/whitelist', function(request, response) {
  //Todo: commit in secret branch!
  response.json(market.fetch());
});

function init() {
	app.listen(app.get('port'), function() {
 	 	console.info('Node app is running at localhost:' + app.get('port'));
	});
}

try {
	var req = market.init();
	if (req) {
		req.on('response', function(){
			console.log('Market data fetching queued.');
			init();
		});
	} else {
		console.info('Market initialization skipped.');
		init();
	}
} catch (e) {
	console.warn('Market initialization failed!');
	init();
}
