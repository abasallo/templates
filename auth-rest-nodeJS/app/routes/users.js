var User = require('../models/user');

module.exports = {

    getAll: function (req, res) {

        User.find(function (err, users) {
            if (err) res.send(err);
            res.json(users);
        })
    },

    get: function (req, res) {

        User.findById(req.params.user_id, function (err, user) {
            if (err) res.send(err);
            res.json(user);
        });
    },

    post: function (req, res) {

        var user = new User();

        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;

        user.save(function (err) {
            if (err) {
                if (err.code == 11000)
                    return res.json({success: false, message: 'A user with that username already exists. '});
                else
                    return res.send(err);
            }

            res.json({message: 'User created!'});
        });
    },

    put: function (req, res) {

        User.findById(req.params.user_id, function (err, user) {

            if (err) res.send(err);
            if (req.body.name) user.name = req.body.name;
            if (req.body.username) user.username = req.body.username;
            if (req.body.password) user.password = req.body.password;
            user.save(function (err) {
                if (err) res.send(err);
                res.json({message: 'User updated!'});
            });
        });
    },

    delete: function (req, res) {

        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err) return res.send(err);
            res.json({message: 'Successfully deleted'});
        });
    }
};