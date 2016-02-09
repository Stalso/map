var mongoose = require('mongoose');
var dbUri = 'mongodb://localhost/Map';
var connection = mongoose.connect(dbUri);
require('./locations');


mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to' + dbUri);
    mongoose.connection.db.listCollections({ name: 'locations' })
        .next(function (err, collinfo) {
        var Location = mongoose.model('Location');
        if (!collinfo) {

            var item = new Location({
                name: 'Starcups',
                address: '125 High Street, Reading, RG6 1PS',
                rating: 3,
                facilities: ['Hot drinks', 'Food', 'Premium wifi'],
                coords: [-0.9690884, 51.455041],
                openingTimes: [{
                        days: 'Monday - Friday',
                        opening: '7:00am',
                        closing: '7:00pm',
                        closed: false
                    }, {
                        days: 'Saturday',
                        opening: '8:00am',
                        closing: '5:00pm',
                        closed: false
                    }, {
                        days: 'Sunday',
                        closed: true
                    }],
                reviews: [{
                        author: 'Simon Holmes',
                        rating: 5,
                        timestamp: new Date("Jul 16, 2013"),
                        reviewText: 'What a great place. I can\'t say enough good things about it.'
                    }, {
                        author: 'Charlie Chaplin',
                        rating: 3,
                        timestamp: new Date("Jun 16, 2013"),
                        reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
                    }]   
            });
            item.save(function (err, location) {
                if (err) {
                    return console.error(err);
                }
                else { 
                    console.log("Saved");
                } 
            });

            var item1 = new Location({
                name: 'Murka',
                address: '125 Sluyapanka Street, Reading, RG6 2PS',
                rating: 3,
                facilities: ['Hot drinks', 'Food', 'Premium wifi','Pivas'],
                coords: [-0.9690884, 52.455041],
                openingTimes: [{
                        days: 'Monday - Friday',
                        opening: '7:00am',
                        closing: '7:00pm',
                        closed: false
                    }, {
                        days: 'Saturday - Sunday',
                        closed: true
                    }],
                reviews: [{
                        author: 'Vasya',
                        rating: 4,
                        timestamp: new Date("Jul 16, 2013"),
                        reviewText: 'What a great place. Troloolool ekpdpdd. I can\'t say enough good things about it.'
                    }, {
                        author: 'Charlie Chaplin',
                        rating: 3,
                        timestamp: new Date("Jun 16, 2013"),
                        reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast. Babu potnyuie.'
                    }]
            });
            item1.save(function (err, location) {
                if (err) {
                    return console.error(err);
                }
                else {
                    console.log("Saved");
                }
            });
        }
    });
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


