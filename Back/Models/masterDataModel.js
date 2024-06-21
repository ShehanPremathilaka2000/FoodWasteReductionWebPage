const db = require('./db.js');

function getQuentitySymbol(result) {
    const sql = 'SELECT * from quentity';
    db.query(sql, (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    });
}

function getTypesData(result) {
    const sql = 'SELECT * from types';
    db.query(sql, (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    });
}

module.exports = { getQuentitySymbol, getTypesData };
