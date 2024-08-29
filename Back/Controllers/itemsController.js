const { error } = require('console');
const itemsModel = require('../Models/itemsModel');

const getAllItems = (req, res) => {
    itemsModel.getAllItems((error, result) => {
        if (error) {
            res.status(500).send({ error });
        } else {
            res.status(200).send({ result });
        }
    });
};

const getListedItems = (req, res) => {
    const { userId } = req.body;
    itemsModel.getListedItems(userId, (error, result) => {
        if (error) {
            res.status(500).send({ error });
        } else {
            res.status(200).send({ result });
        }
    });
};

const getPromotedItems = (req, res) => {
    itemsModel.getPromotedItems((error, result) => {
        if (error) {
            res.status(500).send({ error });
        } else {
            res.status(200).send({ result });
        }
    });
}

const addItem = (req, res) => {
    const { sellerId, name, price, description, expDate, category, quantity, quantityType } = req.body;
    const picture = req.file ? req.file.buffer : null;
    itemsModel.addItem(sellerId, name, price, description, expDate, category, quantity, quantityType, picture, (error, result) => {
        if (error) {
            res.status(500).send({ error });
        } else {
            res.status(200).send({ result });
        }
    });
};

const deleteItem = (req, res) => {
    const { itemId } = req.body;
    itemsModel.deleteItem(itemId, (error, result) => {
        if (error) {
            res.status(500).send({ error });
        } else {
            res.status(200).send({ message: result });
        }
    });
};

const editItem = (req, res) => {
    const { itemId, name, price, description, expDate, category, quantity, quantityType } = req.body;
    const picture = req.file ? req.file.buffer : null;
    itemsModel.editItem(itemId, name, price, description, expDate, category, quantity, quantityType, picture, (error, result) => {
        if (error) {
            res.status(500).send({ error });
        } else {
            res.status(200).send({ message: result });
        }
    });
};

const promoteItem = (req, res) => {
    const { itemId } = req.body;
    console.log("itemId", itemId);
    itemsModel.promoteItem(itemId, (error, result) => {
        if (error) {
            console.log("Error", error)
            res.status(500).send({ error });
        } else {
            console.log("Done")
            res.status(200).send({ message: result });
        }
    });
};

module.exports = { getAllItems, getListedItems, addItem, deleteItem, editItem, promoteItem, getPromotedItems };
