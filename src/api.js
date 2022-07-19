const express = require('express');
require('express-async-errors');
const errorHandler = require('./middlewares/errorHandler');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');

// ...
const app = express();

app.use(express.json());

app.use('/login', loginRoute);
app.use('/user', userRoute);

app.use(errorHandler);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
