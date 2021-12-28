const express = require('express')
const router = express.Router()
// const User = require('../models/user')
const models = require('../models')
const bcrypt = require('bcryptjs')
const db = require('../db.js')
const jwt = require('jsonwebtoken')
const isLoggedIn = require('../auth')

router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const queryResult = await db.getAllUsersAsync()
        res.status(200).json({users: queryResult})
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.post('/login', async (req, res) => {

    if (isEmpty(req.body)) return res.status(400).json({
        message: "Invalid request body"
    })

    try {
        const queryResult = await db.getUserByEmailAsync(req.body.email)
        if (queryResult.length == 0) res.status(400).json({
            message: "No user found with that email",
        })
        userHashedPassword = queryResult[0].password
        bcrypt.compare(req.body.password, userHashedPassword, (err, result) => {
            if(!result) {
                res.status(401).json({
                    auth: false,
                    message: "Invalid credentials",
                    token: null
                })
            } else {
                delete queryResult[0].password
                let token = jwt.sign(queryResult[0], 'loginToken', {expiresIn: '4h'})
                res.status(200).json({
                    auth: true,
                    message: "Logged in successfully",
                    user: queryResult[0],
                    token: token
                })
            }
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.post('/', async (req, res) => {

    if (isEmpty(req.body)) return res.status(400).json({
        message: "Invalid request body"
    })

    if(req.body.password.length < 8) return res.status(400).json({
        message: "Password must be greater than 8 characters"
    })

    if(req.body.password != req.body.password2) return res.status(400).json({
        message: "Password does not match"
    })

    delete req.body.password2
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        req.body.password = hashedPassword
    })


    try {
        var queryResult = await db.getUserByEmailAsync(req.body.email)
        var queryResult2 = await db.addUserAsync(req.body)

        if (queryResult.length > 0) res.status(400).json({
            message: "A user already exists with that email",
        })
        else if (queryResult2.affectedRows == 0) {
            res.status(200).json({
                message: "No changes have been made",
                error: queryResult2
            })
        } else {
            res.status(201).json({
                message: "New user added successfully",
                affectedRows: queryResult2.affectedRows
            })
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.put('/:userId', isLoggedIn, async (req, res) => {

    if (isEmpty(req.body)) return res.status(400).json({
        message: "Invalid request body"
    })

    try {
        queryResult = await db.editUserAsync(req.body, req.params.userId)
        if (queryResult.affectedRows == 0) {
            res.status(200).json({
                message: "No changes have been made",
                error: queryResult
            })
        } else {
            res.status(200).json({
                message: "User info updated successfully",
                affectedRows: queryResult.affectedRows
            })
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.delete('/', isLoggedIn, async (req, res) => {

    if (isEmpty(req.body)) return res.status(400).json({
        message: "Invalid request body"
    })

    try {
        queryResult = await db.deleteUsersAsync(req.body.ids)
        console.log(queryResult)
        if (queryResult.affectedRows == 0)
            res.json({
                message: "No record/s deleted",
                error: queryResult
            })
        else {
            res.json({
                message: `${queryResult.affectedRows} record/s successfully deleted`,
                affectedRows: queryResult.affectedRows
            })
        }

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

//helpers
const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

const getIdsOfArray = (arr) => {
    arr.reduce
}


module.exports = router
