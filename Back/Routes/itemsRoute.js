module.exports = (app) => {
    const multer = require('multer');
    const itemsController = require('../Controllers/itemsController');
    const router = require('express').Router();

    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    app.use('/api/items', router);

    router.post('/getAllItems', itemsController.getAllItems);
    router.post('/getListedItems', itemsController.getListedItems);
    router.post('/addItem', upload.single('photo'), itemsController.addItem);
    router.post('/updateItem', upload.single('photo'), itemsController.editItem);
    router.put('/deleteItem', itemsController.deleteItem);
};
