const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

router.post('/', async (req, res)=> {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email: req.body.email});
    if(user) {
        return res.status(400).send('User already exist with this email.');
    }

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send(_.pick(user, ['name', '_id', 'email', 'isAdmin']));
});
router.get('/me', auth, async (req, res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});
router.put('/me', auth, async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id, {email: req.body.email}).select('-password');
    res.send(user);
})
module.exports = router;