const User = require("../models/User");
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

const registerController = async(req,res) => {
    try {
        const {name, password, email, role} = req.body
        if(!name || !email || !password || !role){
            return res.status(500).send({
                success:false,
                message: 'Please provide all the fields'
            })
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(500).send({
                success: false,
                message: 'Email already registered. Please login'
            })
        }

        var salt = bcrypt.genSaltSync(10);
        const hashedPass = await bcrypt.hash(password, salt)
        const user = await User.create({name, email, password: hashedPass, role})
        res.status(201).send({
            success: true,
            message: 'User Successfully registered',user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in Register API',
            error
        })
    }
}

const loginController = async(req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message: 'Please provide valid credentials'
            })
        }
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).send({
                success:false,
                message: 'User not found'
            })
        }
        const match = await bcrypt.compare(password, user.password)
        if(!match){
            res.status(500).send({
                success:false,
                message: 'Invalid credentials'
            })
        }
        const token = JWT.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn:'7d',
        })
        user.password = undefined
        res.status(200).send({
            success:true,
            token,
            user,
            message:'Login Succesful'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in login API',
            error
        })
    }
}

module.exports = {registerController, loginController}
