const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.error(`Server error: ${err.message}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`Server got: "${msg}" from ${rinfo.address}:${rinfo.port}`);
    
    // Send a response back to the client
    const response = Buffer.from(String(msg));
    server.send(response, rinfo.port, rinfo.address, (err) => {
        if (err) {
            console.error(`Server error: ${err.message}`);
            server.close();
        }
    });
});

server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening on ${address.address}:${address.port}`);
    server.setBroadcast(true); // Enable broadcasting
});

server.bind(5000);
