const mongoose = require('mongoose')

function dbConfig() {
    return mongoose.connect(process.env.DB_URL).then(() => {
        console.log('Database Connected')
    })
}

module.exports = dbConfig