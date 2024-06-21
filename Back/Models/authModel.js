const db = require('./db.js');

function checkUser(userName, result) {
    const sql = 'SELECT id, password from seller where name=(?)';
    db.query(sql, [userName], (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    });
}

function addUser(userName, email, tp, address, location, picture, password, town, result) {
    const sql = 'INSERT INTO seller (name, email, tp, address, location, picture, password, town) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [userName, email, tp, address, location, picture, password, town], (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, true);
        }
    });
}

function updateUser(userId, userName, email, tp, address, location, picture, password, town, result) {
    const sql = 'UPDATE seller SET name=(?), email=(?), tp=(?), address=(?), location=(?), picture=(?), password=(?), town=(?) WHERE id=(?)';
    db.query(sql, [userName, email, tp, address, location, picture, password, town, userId], (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, true);
        }
    });
}

function getUser(userId, result) {
    const sql = 'SELECT * from seller where id=(?)';
    db.query(sql, [userId], (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    });
}

module.exports = { checkUser, addUser, getUser, updateUser };
