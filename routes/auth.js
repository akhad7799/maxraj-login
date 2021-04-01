const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');

router.post('/', async (req, res)=> {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email: req.body.email});
    if(!user) {
        return res.status(400).send('Invalid email or password.');
    }
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isValidPassword)
        return res.status(400).send('Invalid email or password.');

    // const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send('You are logged in.');

});

function validate(req){
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    return schema.validate(req);
}

module.exports = router;