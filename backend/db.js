const mysql = require('mysql2')

const pool = mysql.createPool({
    connectionLimit: 10,
    password: "lokiaqsw10",
    user: "root",
    database: "yondu",
    host: "localhost",
    port: "3306"
})

let db = {};
let tableName = "users"

db.getAllUsersAsync = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${tableName}`, (err, users) => {
            if(err) {
                return reject(err)
            }
            return resolve(users)
        })
    })
}

db.getUserByEmailAsync = (email) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${tableName} WHERE email="${email}"`, (err, user) => {
            if(err) {
                return reject(err)
            }
            return resolve(user)
        })
    })
}

db.addUserAsync = (params) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO ${tableName} SET ?`, params, (err, rows) => {
            if (err) {
                return reject(err)
            }
            return resolve({
                affectedRows: rows.affectedRows
            })
        })
    })
}

db.editUserAsync = (params, userId) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE ${tableName} SET ? WHERE id=${userId}`, params, (err, rows) => {
            if (err) {
                return reject(err)
            }
            return resolve({
                affectedRows: rows.affectedRows
            })
        })
    })
}

db.deleteUsersAsync = (userIds) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM ${tableName} WHERE id IN (${userIds})`, (err, rows) => {
            if (err) {
                return reject(err)
            }
            return resolve({
                affectedRows: rows.affectedRows
            })
        })
    })
}

module.exports = db;
