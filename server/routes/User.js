const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users list endpoint
router.post('/all', function (req, res, next) {
    User.find().sort({ fullname: 1 })
        .skip(parseInt(req.body.skip))
        .limit(parseInt(req.body.limit))
        .populate('group')
        .exec(function (err, users) {
            if (err) {
                return res.status(500).json({
                    code: 500,
                    error: err
                })
            } else {
                res.status(200).json({
                    code: 200,
                    message: "success",
                    data: users
                })
            }
        });
});

// Get user by id endpoint
router.post('/byid/:id', function (req, res, next) {
    User.findById(req.params.id)
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    code: 500,
                    error: err
                })
            } else if (!user) {
                return res.status(404).json({
                    code: 404,
                    error: 'User not found'
                });
            } else {
                res.status(200).json({
                    code: 200,
                    data: user
                })
            }
        });
});



//Add user endpoint
router.post('/add', function (req, res, next) {
    if (!req.body.fullname) {
        return res.status(400).json({
            code: 400,
            error: "Please provide Full Name"
        });
    } else {
        const user = new User({
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
            birthdate: req.body.birthdate,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            postal: req.body.postal,
            country: req.body.country,
        });

        user.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    code: 500,
                    title: 'An error occurred',
                    error: err
                });
            } else {
                res.status(200).json({
                    code: 200,
                    message: 'New User Successfully Added',
                    type: 'created',
                    data: result
                });
            }
        });
    }

});

//Update user endpoint
router.put('/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).json({
                code: 500,
                error: err
            });
        } else if (!user) {
            return res.status(404).json({
                code: 404,
                error: 'User not found'
            });
        } else {
            user.fullname = req.body.fullname;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.role = req.body.role;
            user.birthdate = req.body.birthdate;
            user.address1 = req.body.address1;
            user.address2 = req.body.address2;
            user.city = req.body.city;
            user.state = req.body.state;
            user.postal = req.body.postal;
            user.country = req.body.country;
            user.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        code: 500,
                        error: err
                    });
                } else {
                    res.status(200).json({
                        code: 200,
                        message: 'User Updated'
                    });
                }
            });
        }
    });
});

//Delete user endpoint
router.delete('/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).json({
                code: 500,
                error: err
            });
        } else if (!user) {
            return res.status(404).json({
                code: 404,
                error: 'User not found'
            });
        } else {
            user.remove(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        code: 500,
                        error: err
                    });
                } else {
                    res.status(200).json({
                        code: 200,
                        message: 'User deleted',
                        type: 'deleted'
                    });
                }
            });
        }
    });
});

module.exports = router;