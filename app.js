var express = require("express"),
    cors = require('cors');

var app = module.exports = express();

// var connection = require('./database');

// Used to parse the body of HTTP requests.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var corsOptions = {
    origin: function(origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}

app.use(cors(corsOptions));

// app.get("/url", (req, res, next) => {
//     connection.query('SHOW DATABASES', (err, result) => {
//         if (err) {
//             throw err;
//         }

//         console.log(result);
//         res.send(result);
//     });
// });

const PORT = 8081;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
})

require('./account');
// require('./vehicle');
// require('./maintenanceHistory');
// require('./rentalHistory');
// require('./reservation');