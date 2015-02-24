var Hapi = require('hapi');

var sources = require('./lib/sources');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path:'/hello',
    handler: sources.test
});

// Start the server
server.start();








