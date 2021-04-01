module.exports = function (req, res, next) {
    if(!req.user.isAdmin)
        return res.status(403).send('This action is not allowed');
    next();
}