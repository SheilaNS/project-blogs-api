const express = require('express');
require('express-async-errors');
const errorHandler = require('./middlewares/errorHandler');
const categoryRoute = require('./routes/category');
const loginRoute = require('./routes/login');
const postRoute = require('./routes/post');
const userRoute = require('./routes/user');

// ...
const app = express();

app.use(express.json());

app.use('/categories', categoryRoute);
app.use('/login', loginRoute);
app.use('/post', postRoute);
app.use('/user', userRoute);

app.use(errorHandler);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
