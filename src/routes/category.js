const { Router } = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRoute = Router();

categoryRoute.post('/', categoryController.add);

module.exports = categoryRoute;
