module.exports = (app) => {
    const masterDataController = require('../Controllers/masterDataController');
    const router = require('express').Router();

    app.use('/api/masterData', router);

    router.get('/getQuentitySymbol', masterDataController.getQuentitySymbol);
    router.get('/getTypesData', masterDataController.getTypesData);
};
