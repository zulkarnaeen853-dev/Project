const mongoose = require('mongoose')

const {Schema} = mongoose

const regisBluePrint = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const user = mongoose.model("user", regisBluePrint)
module.exports = user