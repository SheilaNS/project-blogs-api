const { Router } = require('express');
const postController = require('../controllers/postController');

const postRoute = Router();

postRoute.post('/', postController.add);
postRoute.get('/', postController.list);

module.exports = postRoute;
