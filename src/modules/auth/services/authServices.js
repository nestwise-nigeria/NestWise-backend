const bcrypt = require('bcrypt')
const { error } = require('../../../utils/helpers')
const User = require('../../../models/userModel')
const { generateToken } = require('../../../utils/jwt')

const newUser = async (firstname, lastname, email, phone, role, password, nationality, dob, idType, idNumber, idPicture) => {

    try{
        const existingUser = await User.findOne( { where: { email }})
        if(existingUser){
            error(409, 'User already exist')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const addUser = await User.create({
            firstname,
            lastname,
            email,
            role,
            phone,
            password: hashedPassword,
            nationality,
             dob,
            idType,
            idNumber,
            idPicture
        })

        if(!addUser){
            error(503, 'Service unavailable')
        }
        const token = generateToken(addUser)
        return token

    }
    catch(err){
        error(err.statusCode || 500, err.message || 'Internal server error')
    }
}

const loginUser = async (email, password) => {
    try{
        //check if user account exist
        const user = await User.findOne({ where: { email }})
        if(!user) error(401, 'Invalid credentials')

        //if user is found, proceed to validate password
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword) error(401, 'Invalid credentials')

        // return user
        const token = generateToken(user)
        return token
    }
    catch(err){
        error(err.statusCode || 500, err.message || 'Internal server error');
    }
}

module.exports = {
    newUser,
    loginUser
}