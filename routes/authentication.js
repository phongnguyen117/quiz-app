// Dependencies
const express = require('express')
const routerUser = express.Router()
const jwt = require('jsonwebtoken')

// Config Files
const dbConfig = require('../config/db')

// Model
const userModel = require('../models/users')

// User API Routes (api/users/)
routerUser.get('/users', (req, res, next) => {

    // Get All Users
    userModel.find({}, function (err, items) {
        if (err) {
            res.json({ err: err })
        } else {
            res.json({ users: items })
        }
    })

})


routerUser.post('/signup', (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
        return res.status(400).json({ message: 'Authentication failed. Missing email or password or username.' })
    }

    userModel.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err
        if (user) {
            res.status(400).json({ message: 'Authentication failed. Email is exist.' })
        } else if (!user) {
            let user = new userModel({
                email: req.body.email,
                password: req.body.password,
                username: req.body.username
            })
            user.save(function (err, data) {
                if (err) {
                    return res.status(400).json({ error: err })
                }
                res.status(200).json({message: 'The user create successfully'})
            })
        }
    })
   
})

routerUser.post('/login', function (req, res) {

    userModel.authenticate(req.body.email, req.body.password, function (error, user) {
        if (error || !user) {
            return res.json({ success: false, message: 'Authentication failed. Wrong password.' })
        } else {
            let token = jwt.sign(user, req.app.get('superSecret'), {
                expiresIn: 1440
            })
            return res.status(400).json({
                message: 'Enjoy your token!',
                token: token
            })
        }
    })
})


routerUser.post('/logout', function (req, res) {

    jwt.expireToken(req.headers, function(err, success) {
        if (err) {
            logger.error(err.message);
            return res.status(401).send(err.message);
        }

        if(success) {
            delete req.user;
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    });
})

// Export this Module
module.exports = routerUser
