var http = require('http');
var url = require('url');

var channels = require('./channels.json').init.channels;

var port = process.env.PORT || 5555;

http.createServer(function(req, res) {
	
	var origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin', origin);
	
//	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);	

	if (req.url === '/favicon.ico') {
		return;
	}
	
		var requestPath = url.parse(req.url).pathname;

		switch (requestPath) {
            case '/api/channels':
                getChannelTableApi(res, req);
            break;
            case '/api/scheduled':
				
				var channel = url.parse(req.url, true).query.channel;
                getChannelListings(channel, function(data) {
                    data.sort(compare);
                    var json = JSON.stringify(data);
					res.end(json);
				});
				
            break;
			default :
				res.end('eroor');
			break;
		}
	
}).listen(port);
console.log("Web server now running on port " + port)


function getChannelTableApi(initRes, req){
	initRes.end(JSON.stringify(channels));
}


function zeroPad(n){
   return n < 10 ? '0'+n : n;
}


function getChannelListings(channel,callback){
   var listingsCount = 0;
   var mergedListings = [];
   
   var now = new Date(),
      year = now.getFullYear(),
      month = zeroPad(now.getUTCMonth() + 1),
      date = zeroPad(now.getUTCDate()),
      fullDate = year +'-'+ month +'-'+ date;
   
   for (var i = 0; i < 4; i++){
      var options = {
        host: 'tv.sky.com',
        port: 80,
        path: '/programme/channel/' + channel +'/'+ fullDate + '/' + i + '.json'
      };

      var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        var chunks = "";
        
        res.on('data', function (chunk) {
	        chunks = chunks + chunk;
        });
        
        res.on('end', function () {
            try
            {
                var parsed = JSON.parse(chunks);
          listingsCount ++;
          
          for (var key in parsed.listings) {
               if(key == channel){
                  var progs = parsed.listings[channel];
                  for(var j = 0; j < progs.length; j++) {
                     mergedListings.push(progs[j]);
                 }
               }
            }
            }
            catch(e)
            {
               console.log("eroooor "+channel);
            }
          
            if(listingsCount == 4){
               console.log('Got Listings for channel '+ channel + ' No of programs: '+mergedListings.length )
               callback(mergedListings);
            }
        });
      });
      req.end();
   }
};


function compare(a,b) {
  if (a.s < b.s)
     return -1;
  if (a.s > b.s)
    return 1;
  return 0;
}

