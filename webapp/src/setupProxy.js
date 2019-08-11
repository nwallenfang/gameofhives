const proxy = require('http-proxy-middleware');

console.log('hello');
module.exports = function (app) {
    app.use(proxy('/api', { target: 'http://localhost:8000/' }));
    app.use(proxy('/socket.io', { target: 'http://localhost:8000/' }));
    app.use(proxy('/sockjs-node', { target: 'http://localhost:8000/' }));
};
