const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

socket.on('listening', function () {
	const address = socket.address();
	console.log('UDP socket listening on ' + address.address + ":" + address.port);
});

socket.on('message', function (message, remote) {
	console.log('SERVER RECEIVED:', remote.address + ':' + remote.port +' - ' + message);
	const response = "Hello there!";
	socket.send(response, 0, response.length, remote.port, remote.address);
});

socket.bind('5555');