const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const cors = require('cors')
const bodyParser = require('body-parser')

// DB Connection

// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     user: 'root',
//     password: 'lokiaqsw10',
//     database: 'yondu'
// })
// const dbConn = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: "lokiaqsw10",
//     database: "yondu"
// })

// dbConn.connect( (err) => {
//     if(!err)
//         console.log("MySQL database connection success")
//     else
//         console.log("MySQL database connection failed \n Error: " + JSON.stringify(err, undefined, 2))
// })

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// Define routes
app.use('/users', require('./routes/users'))

app.listen(port, () => console.log(`Server is now running in port ${port}`))
