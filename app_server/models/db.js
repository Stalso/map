var mongoose = require('mongoose');
var dbUri = 'mongodb://localhost/Map';
mongoose.connect(dbUri);
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to' + dbUri);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

var readline = require('readline');
if (process.platform === 'win32') {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', function () {
        process.emit('SIGINT');
    });
}

var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () { 
        console.log('Mongoose disconnected through' + msg);
    });
};
// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});