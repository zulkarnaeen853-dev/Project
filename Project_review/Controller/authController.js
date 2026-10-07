const user = require('../Model/registerModel')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const regisController = async (req, res) => {
    const { name, email, password, profilePic, address, phone, gender, dob } = req.body
     const existedUser = await user.findOne({email})

    if (!name || !email || !password || !profilePic || !address || !phone || !gender || !dob) {
        return res.status(400).send({
            success: false,
            message: 'Name, email, and password are required'
        })
    }

    if (existedUser) {
        return res.status(409).send({
            success: false,
            message: 'User already exists',
            data: { email: existedUser.email }
        })
    } else {
        const newUser = new user({
            name,
            email,
            password,
            profilePic,
            address,
            phone,
            gender,
            dob
        })

        await newUser.save()

        return res.status(201).send({
            success: true,
            message: 'User registered successfully'
        })
    }
}



module.exports = { regisController }