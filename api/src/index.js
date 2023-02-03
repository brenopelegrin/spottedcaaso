const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// defining the Express app

const app = express('/api');
const port = 3000;

const globalRouter = express.Router();

globalRouter.use( (req, res, next) => {
    next();
});

globalRouter.use(bodyParser.json());
globalRouter.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', globalRouter);

const User = require('./models/User');
const Comment = require('./models/Comment');
const Spotted = require('./models/Spotted');

User.sync();
Comment.sync();
Spotted.sync();

require('./controllers/authController')(globalRouter);
require('./protected/protectedRoutes')(globalRouter);

app.listen(port);
console.log(`server started listening on port ${port}.`)