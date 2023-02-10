const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

router.post('/register', async (req, res) => {
    const { email, password, username } = req.body;

    const isEmailAlreadyRegistered = await User.findOne( {where: {email: email}} );
    const isUsernameAlreadyRegistered = await User.findOne( {where: {username: username}} );

    if (isEmailAlreadyRegistered){
        return res.status(400).send({ success: false, message: 'The provided email is already registered', internal_code: 1 });
    };
    if (isUsernameAlreadyRegistered){
        return res.status(400).send({ success: false, message: 'The provided username is already registered', internal_code: 2 });
    };

    try {
        await User.sync();

        const newUser = await User.create(
            { 
                email: email,
                password: password,
                username: username,
            }
        );

        return res.status(200).send({success: true, message: 'User has been registrated', internal_code: 3 });

    } catch (err) {
        return res.status(400).send({ success: false, message: 'Registration failed', internal_code: 4 });
    };
});

router.post('/authenticate', async (req, res) => {
    const {email, password} = req.body;

    const user = await User.scope('showLoginData').findOne({ where: {email: email}})
    if(!user || !await bcrypt.compare(password, user.password)){
        res.status(400).send({success: false, message: "Incorrect password or user doesn't exist.", internal_code: 5 })
    }
    else{
        const token = generateToken({ id: user.id });
        res.status(200).send({succes: true, message: "User has authenticated with success", token: token, internal_code: 6})
    }
});

module.exports = app => app.use('/auth', router);