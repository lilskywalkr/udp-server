const dgram = require('dgram');
const client = dgram.createSocket('udp4');

// Port to send messages to
const PORT = 5000;

// Handle client errors
client.on('error', (err) => {
    console.error(`Client error: ${err.err}`);
    client.close();
});

// Handle incoming messages
client.on('message', (msg, rinfo) => {
    console.log(`Client got: "${msg}" from ${rinfo.address}:${rinfo.port}`);
});

// Message to send
const message = Buffer.from('Hello, server!');

// Sending broadcast message
client.bind(() => {
    client.setBroadcast(true); // Enable broadcasting
    client.send(message, PORT, '255.255.255.255', (err) => {
        if (err) {
            console.error(`Client error: ${err.err}`);
            client.close();
        }
        console.log('Message sent as broadcast!');
    });
});
