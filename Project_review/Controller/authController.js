const user = require('../Model/registerModel')

const regisController =  async(req, res) =>{
    const {name, email} = req.body
    const existedUser = await user.findOne({ email })

    if (!name || !email){
         res.send({
            success: false,
            message: "all fields should be filled"
        })
    }

    if (existedUser){
         res.send({
            success: false,
            message: 'User already exists',
            data: { email: existedUser.email }
        })
    }

    const newUser = new user({ name:name, email:email })
     res.send({
        success: true,
        message: 'User registered successfully',

    })

    await newUser.save()

}   

const unlockController = (req, res) => {
    const { password } = req.body

    if (password !== process.env.UNLOCK_PASSWORD) {
        return res.send({
            success: false,
            message: 'Incorrect password'
        })
    }

    return user.find({}).then(allUsers => {
        return res.send({
            success: true,
            message: 'Data unlocked',
            data: allUsers
        })
    })
}

module.exports = {regisController, unlockController}