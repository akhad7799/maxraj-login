const express = require('express');
const projectsRoute = require('../routes/projects');
const userRoute = require('../routes/users');
const authRoute = require('../routes/auth');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/projects', projectsRoute);
    app.use('/api/users', userRoute);
    app.use('/api/auth', authRoute);
}