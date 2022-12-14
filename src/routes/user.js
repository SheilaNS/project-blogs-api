const { Router } = require('express');
const userController = require('../controllers/userController');

const userRoute = Router();

userRoute.post('/', userController.add);
userRoute.get('/:id', userController.get);
userRoute.get('/', userController.getAll);

module.exports = userRoute;
