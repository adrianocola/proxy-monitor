const secret = require('./secret.json');
const http = require('http');

const check_interval = 1000 * (secret.interval || 60) * 1.5; // default: 90 seconds

let last_check = null;

http.createServer(function (req, res) {
    if(req.method === 'POST' || req.method === 'PUT'){
        last_check = new Date();
    }
    if(!last_check){
        res.write('ERROR - INITIAL');
    }else if(Date.now() - last_check.getTime() > check_interval){
        res.write(`ERROR - ${last_check}`);
    }else{
        res.write(`OK - ${last_check}`);
    }
    res.end();
}).listen(secret.port);
console.log(`Listening to port ${secret.port}`);