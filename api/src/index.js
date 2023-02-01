const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// defining the Express app
const app = express();
const port = 3000;

const sequelize = require('./database');
const User = require('./models/User');
const Spotted = require('./models/Spotted');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    await sequelize.sync({force: true});
    const testeUser = await User.create(
        { 
            email: "emailteste@usp.br",
            public_id: "publicid",
            private_id: "privateid",
            password: "testpassword",
            username: "user",
            verified: false
        }
    );
    const testSpotted = await Spotted.create(
        { 
            issuer_public_id: "test_publicid",
            text: "mytextblablabla"
        }
    );
    const users = await User.findAll();
    const spotteds = await Spotted.findAll();
    console.log("All users:", JSON.stringify(users, null, 2));
    console.log("All spotteds:", JSON.stringify(spotteds, null, 2));
    res.send('hello world');
});

app.listen(port);
console.log(`server started listening on port ${port}.`)