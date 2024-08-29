const authModel = require('../Models/authModel');

const checkUser = (req, res) => {
    const { userName, password } = req.body;
    authModel.checkUser(userName, (error, result) => {
        if (error) {
            res.status(500).send({
                message: error,
            });
        } else {
            res.status(200).send({
                result: result[0].password === password,
                userId: result[0].id,
                admin: result[0].admin === 1,
            });
        }
    });
};

const addUser = (req, res) => {
    const { name, email, tp, address, location, password, town } = req.body;
    const picture = req.file ? req.file.buffer : null;
    authModel.addUser(name, email, tp, address, location, picture, password, town, (error, result) => {
        if (error) {
            res.status(500).send({
                message: error,
            });
        } else {
            res.status(200).send({
                message: result,
            });
        }
    });
};

const updateUser = (req, res) => {
    const { id, name, email, tp, address, location, password, town } = req.body;
    const picture = req.file ? req.file.buffer : null;
    authModel.updateUser(id, name, email, tp, address, location, picture, password, town, (error, result) => {
        if (error) {
            res.status(500).send({
                message: error,
            });
        } else {
            res.status(200).send({
                message: result,
            });
        }
    });
};

const getUser = (req, res) => {
    const { userId } = req.body;
    authModel.getUser(userId, (error, result) => {
        if (error) {
            res.status(500).send({ error });
        } else {
            res.status(200).send({ result });
        }
    });
};

module.exports = { checkUser, addUser, getUser, updateUser };
