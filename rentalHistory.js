var app = require('./app');

var connection = require('./database');

// Select rental history for a specific vin
app.get('/rentalHistory/:vin', (req, res) => {
    let vin = req.params.vin;

    var rentalHistory = `SELECT comment FROM Rental_History WHERE vin = '${vin}'`;

    connection.query(rentalHistory, (err, result) => {
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

// Insert rental history for a specific vin
app.put('/rentalHistory/:vin', (req, res) => {
    let tmpBody = req.body;
    tmpBody.vin = req.params.vin;

    var rentalHistory = 'INSERT INTO Rental_History SET ?';

    connection.query(rentalHistory, tmpBody, (err, result) => {
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