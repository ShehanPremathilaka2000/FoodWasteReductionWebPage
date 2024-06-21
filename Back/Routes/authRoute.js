module.exports = (app) => {
    const multer = require('multer');
    const authController = require('../Controllers/authController');
    const router = require('express').Router();

    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    app.use('/api/auth', router);

    router.post('/checkUser', authController.checkUser);
    router.post('/addUser', upload.single('photo'), authController.addUser);
    router.post('/getUser', authController.getUser);
    router.post('/updateUser', upload.single('photo'), authController.updateUser);
};
