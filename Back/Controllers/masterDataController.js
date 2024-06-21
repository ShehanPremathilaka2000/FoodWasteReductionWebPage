const masterDataModel = require('../Models/masterDataModel');

const getQuentitySymbol = (req, res) => {
    masterDataModel.getQuentitySymbol((error, result) => {
        if (error) {
            res.status(500).send({ error });
        } else {
            res.status(200).send({ result });
        }
    });
};

const getTypesData = (req, res) => {
    masterDataModel.getTypesData((error, result) => {
        if (error) {
            res.status(500).send({ error });
        } else {
            res.status(200).send({ result });
        }
    });
};

module.exports = { getQuentitySymbol, getTypesData };
