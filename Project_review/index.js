require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const dns = require('node:dns')
const Route = require('./Route/index')
const cors = require('cors')
dns.setServers(["8.8.8.8", "1.1.1.1"])

app.use(express.json())

const dbConfig = require('./Config/dbConfig')
app.use(cors());
app.use(Route)
dbConfig()



app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})