// server.js
var express = require("express");
var bodyParser = require('body-parser');
var logfmt = require("logfmt");
var app = express();



app.use(logfmt.requestLogger());
// app.use(bodyParser());
app.use(bodyParser.json());
app.use(function(err,req,res,next){
	if(err){
		console.log('Invalid JSON');
		res.json(400, { error: "Could not decode request: JSON parsing failed" });
	}
	
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.post('/', function(req, res){
	var p = req.body.payload;
	var l = p.length;
	var r = { "response":[] };

	for(var i=0; i<l; i++){
		if(p[i].drm && p[i].episodeCount > 0){
			r.response.push({
				"image" : p[i].image.showImage,
				"slug"  : p[i].slug,
				"title" : p[i].title
			});
		}
	}
	res.json(r);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});