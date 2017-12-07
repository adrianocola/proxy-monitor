const secret = require('./secret.json');
const http = require('http');

const check_interval = 1000 * (secret.interval || 60) * 1.5; // default: 90 seconds

let last_check = null;

http.createServer(function (req, res) {
    if(req.method === 'POST' || req.method === 'PUT'){
        last_check = new Date();
    }
    if(!last_check){
        res.statusCode = 503;
        res.end('ERROR - INITIAL');
    }else if(Date.now() - last_check.getTime() > check_interval){
        res.statusCode = 503;
        res.end(`ERROR - ${last_check}`);
    }else{
        res.statusCode = 200;
        res.end(`OK - ${last_check}`);
    }
}).listen(secret.port);
console.log(`Listening to port ${secret.port}`);