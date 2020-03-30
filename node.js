const readline = require('readline');
const Redis = require('ioredis');

var cluster = new Redis.Cluster([{
    port: 6379,
    host: 'SG-example-1.servers.scalegrid.io'
},
{
    port: 6379,
    host: 'SG-example-2.servers.scalegrid.io'
},
{
    port: 6379,
    host: 'SG-example-3.servers.scalegrid.io'
},
{
    port: 6379,
    host: 'SG-example-4.servers.scalegrid.io'
},
{
    port: 6379,
    host: 'SG-example-5.servers.scalegrid.io'
},
{
    port: 6379,
    host: 'SG-example-6.servers.scalegrid.io'
}
], { redisOptions: { password: '<auth>' } });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'enter key> '
});

console.log('Welcome to the Redis Cluster reader. Enter the key which you want to read [Ctrl D to Exit]');
rl.prompt();
rl.on('line', (line) => {
    if (line.trim()) {
        cluster.get(line, function (err, result) {
            if (err) {
                console.error(err);
            } else {
                console.log("value: " + result);
            }
            rl.prompt();
        });
    } else {
        console.error("No input received");
        rl.prompt();
    }
}).on('close', () => {
    console.log('\nterminating');
    cluster.quit();
    process.exit(0);
});