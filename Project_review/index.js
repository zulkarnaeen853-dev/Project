require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const dns = require('node:dns')
const cors = require('cors')
dns.setServers(["8.8.8.8", "1.1.1.1"])

app.use(express.json())

const dbConfig = require('./Config/dbConfig')
app.use(cors());
dbConfig()



app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})