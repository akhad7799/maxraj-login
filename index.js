const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('./startup/config')();
require('./startup/routes')(app);
require('./startup/prod')(app);

mongoose.connect('mongodb://localhost/maxraj', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to mongodb...');
    })
    .catch((err) => {
        console.error('Error occured during connection to mongodb');
    });
mongoose.set('useFindAndModify', false);

const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`Connected to port ${port}`));
