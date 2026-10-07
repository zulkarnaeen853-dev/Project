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
    },
    profilePic: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    gender: {
        type: String
    },
    dob: {
        type: String
    }

})

const user = mongoose.model("user", regisBluePrint)
module.exports = user