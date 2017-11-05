const secret = require('./secret.json');
const http = require('http');

const ping_interval = 1000 * secret.interval; // 60 seconds

const ping = () => {
    http.request({
        host: secret.host,
        port: secret.port,
        method: 'POST',
    }).end();
};

setInterval(ping, ping_interval);
ping();