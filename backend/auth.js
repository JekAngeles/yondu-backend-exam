const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()

const isLoggedIn = (req, res, next) => {
    let token = req.headers['x-auth-token']
    // console.log(token)
    jwt.verify(token, 'loginToken', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "You are not logged in"
            })
        }
        next()
    })
}

module.exports = isLoggedIn
