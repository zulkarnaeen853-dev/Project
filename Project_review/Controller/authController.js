const user = require('../Model/registerModel')
const bcrypt = require('bcrypt')

const regisController = async (req, res) => {
    const { name, email, password, profilePic, address, phone, gender, dob } = req.body || {}

    if (
        typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim() ||
        typeof password !== 'string' || !password.trim()
    ) {
        return res.status(400).send({
            success: false,
            message: 'Name, email, and password are required'
        })
    } else if (
        [profilePic, address, phone, gender, dob].some(
            value => value != null && typeof value !== 'string'
        )
    ) {
        return res.status(400).send({
            success: false,
            message: 'Optional profile fields must be strings'
        })
    }

    const existedUser = await user.findOne({ email: email.trim() })

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