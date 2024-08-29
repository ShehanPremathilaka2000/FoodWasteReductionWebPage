const db = require('./db.js');

function getAllItems(result) {
    const sql = 'SELECT * from data where available=1';
    db.query(sql, (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    });
}

function getListedItems(userId, result) {
    const sql = 'SELECT * from data where seller_id=(?) and available=1';
    db.query(sql, [userId], (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    });
}

function getPromotedItems(result) {
    const sql = 'SELECT * from data where promoted=1 and available=1';
    db.query(sql, (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    });
}

function addItem(sellerId, name, price, description, expireDate, typeId, quentity, quentitySymbol, photo, result) {
    const sql =
        'INSERT INTO items (seller_id, name, price, description, expire_date, type_id, quentity, quentity_symbol, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [sellerId, name, price, description, expireDate, typeId, quentity, quentitySymbol, photo], (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, true);
        }
    });
}

function deleteItem(itemId, result) {
    const sql = 'UPDATE items SET available=0 where id=(?)';
    db.query(sql, [itemId], (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, true);
        }
    });
}

function editItem(itemId, name, price, description, expireDate, typeId, quentity, quentitySymbol, photo, result) {
    const sql =
        'UPDATE items SET name=(?), price=(?), description=(?), expire_date=(?), type_id=(?), quentity=(?), quentity_symbol=(?), photo=(?) where id=(?)';
    db.query(sql, [name, price, description, expireDate, typeId, quentity, quentitySymbol, photo, itemId], (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, true);
        }
    });
}

function promoteItem(itemId, result) {
    const sql = 'Update items SET promoted=1 where id=(?)';
    db.query(sql, [itemId], (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, true)
        }
    });
}

module.exports = { getAllItems, getListedItems, addItem, deleteItem, editItem, promoteItem, getPromotedItems };
