var app = require('./app');

var connection = require('./database');

// Get reservations for all vehicles
app.get('/reservations', (req, res) => {
    let maintenanceHistory = 'SELECT * FROM Reservation';

    connection.query(maintenanceHistory, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(400);
            res.json({error: err.message});
        } else {
            res.status(200);
            res.json(result);
        }
    });
});

// Insert reservation for a specific member
app.put('/reservations/:memberNumber', (req, res) => {
    let tmpBody = req.body;
    tmpBody.memberNumber = req.params.memberNumber;

    let reservation = 'INSERT INTO Reservation SET ?';

    connection.query(reservation, tmpBody, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(400);
            res.json({error: err.message});
        } else {
            res.status(200);
            res.json(result);
        }
    });
});

// Select reservations for a specific member
app.get('/users/:memberNumber/reservations', (req, res) => {
    let memberNumber = req.params.memberNumber;

    let reservations = `SELECT * FROM Reservation WHERE memberNumber = ${memberNumber}`;

    connection.query(reservations, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(400);
            res.json({error: err.message});
        } else {
            res.status(200);
            res.json(result);
        }
    });
});

// Select reservations for a specific vehicle
app.get('/vehicles/:vin/reservations', (req, res) => {
    let vin = req.params.vin;

    let reservations = `SELECT * FROM Reservation WHERE vin = '${vin}'`;

    connection.query(reservations, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(400);
            res.json({error: err.message});
        } else {
            res.status(200);
            res.json(result);
        }
    });
});