const { Router } = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRoute = Router();

categoryRoute.post('/', categoryController.add);
categoryRoute.get('/', categoryController.getAll);

module.exports = categoryRoute;
