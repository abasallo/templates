var jwt     = require('jsonwebtoken');

var User    = require('../models/user'),
    config  = require('../config');

module.exports = {

    post: function (req, res) {

        User.findOne({
            username: req.body.username
        }).select('name username password').exec(function (err, user) {

            if (err) throw err;

            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) {
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {
                    var token = jwt.sign({
                        name: user.name,
                        username: user.username
                    }, config.jwtSecret, {
                        expiresInMinutes: 1440
                    });
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        })
    }
}