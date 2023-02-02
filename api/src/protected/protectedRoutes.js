// use auth middleware

const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', (req, res) => {
    res.status(200).send({ message: 'ok'});
});

module.exports = app => app.use('/protected', router);