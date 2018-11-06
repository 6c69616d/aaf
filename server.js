var http = require("http");
var url = require("url");
function start(handle, route) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        var query = url.parse(request.url).query;
        var postData = "";
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received more data: "+ postDataChunk);
        });
        request.addListener("end", function() {
            route(handle, pathname, response, postData);
        });
    }
    http.createServer(onRequest).listen(3000);
    console.log("Server started");

}
exports.start = start;


