const dgram = require('dgram');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter multicast group IP (e.g., 239.255.0.1): ', (groupAddress) => {
    rl.question('Enter port number (e.g., 5000): ', (port) => {
        const client = dgram.createSocket({ type: 'udp4', reuseAddr: true });

        client.bind(port, () => {
            client.addMembership(groupAddress); // Join the multicast group

            console.log(`Joined multicast group ${groupAddress} on port ${port}`);

            client.on('message', (message, remote) => {
                console.log(`Received message from ${remote.address}:${remote.port} - ${message}`);
            });
        });
    });
});
