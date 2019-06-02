var app = require('./app');

var connection = require('./database');

// Verifies that the email and password exist in the database.
app.get('/vehicles', (req, res) => {
    var getAllVehicles = 'SELECT * FROM Vehicle';

    connection.query(getAllVehicles, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({error: err.message});
        } else {
            res.json(result);
        }
    });
});

// Available vehicles throughout the specified date range.
app.get('/vehicles/available', (req, res) => {
    var reservationStart = req.query.reservationStart;
    var reservationEnd = req.query.reservationEnd;
    var numSeats = req.query.numSeats;

    var getAvailableVehicles = `SELECT * FROM Vehicle WHERE vin NOT IN (SELECT vin FROM`;
    getAvailableVehicles += ` Reservation WHERE reservationStart <= ${reservationStart} AND reservationEnd >= ${reservationStart}`;
    getAvailableVehicles += ` OR reservationStart <= ${reservationEnd} AND reservationEnd >= ${reservationEnd})`;
    getAvailableVehicles += ` AND numSeats = ${numSeats}`;

    connection.query(getAvailableVehicles, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({error: err.message});
        } else {
            res.json(result);
        }
    });
});

// Select information about specific vehicle
app.get('/vehicles/:vin', (req, res) => {
    console.log(req.params.vin);
    let vehicleInformation = `SELECT * FROM Vehicle WHERE vin = '${req.params.vin}'`;

    connection.query(vehicleInformation, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({error: err.message});
        } else {
            res.json(result);
        }
    });
});

// Select comments about specific vehicle
app.get('/vehicles/:vin/comments', (req, res) => {
    console.log(req.params.vin);
    let vehicleComments = `SELECT Rental_History.comment FROM Vehicle as v`;
    vehicleComments += ` INNER JOIN Rental_History as rh ON v.vin = rh.vin WHERE vin = '${req.params.vin}'`;

    connection.query(vehicleComments, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({error: err.message});
        } else {
            res.json(result);
        }
    });
});