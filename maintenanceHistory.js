var app = require('./app');

var connection = require('./database');

// Get maintenance history for all vehicles
app.get('/maintenanceHistory', (req, res) => {
    var maintenanceHistory = 'SELECT * FROM Maintenance_History';

    connection.query(maintenanceHistory, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({error: err.message});
        } else {
            res.json(result);
        }
    });
});

// Insert maintenance history row for a specific vin
app.put('/maintenanceHistory/:vin', (req, res) => {
    let tmpBody = req.body;
    tmpBody.vin = req.params.vin;

    // TODO: generate date and time
    var maintenanceHistory = 'INSERT INTO Maintenance_History SET ?';

    connection.query(maintenanceHistory, tmpBody, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({error: err.message});
        } else {
            res.json(result);
        }
    });
});

// Insert maintenance history row for a specific vin
app.get('/maintenanceHistory/:vin', (req, res) => {
    let vin = req.params.vin;

    var maintenanceHistory = `SELECT * FROM Maintenance_History WHERE vin = '${vin}'`;

    connection.query(maintenanceHistory, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({error: err.message});
        } else {
            res.json(result);
        }
    });
});