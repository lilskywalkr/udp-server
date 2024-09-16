const dgram = require('dgram');
const readline = require('readline');

// Multicast group address and port can be configured by the user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter multicast group IP (e.g., 239.255.0.1): ', (groupAddress) => {
    rl.question('Enter port number (e.g., 5000): ', (port) => {
        const server = dgram.createSocket({ type: 'udp4', reuseAddr: true });

        server.bind(port, () => {
            server.setBroadcast(true);
            server.setMulticastTTL(128); // Set TTL to limit message range
            server.addMembership(groupAddress); // Join the multicast group

            console.log(`UDP Multicast server is running on ${groupAddress}:${port}`);

            // Broadcast user input to the multicast group
            rl.on('line', (input) => {
                const message = Buffer.from(input);
                server.send(message, 0, message.length, port, groupAddress, () => {
                    console.log(`Sent message: "${input}" to ${groupAddress}:${port}`);
                });
            });
        });
    });
});
