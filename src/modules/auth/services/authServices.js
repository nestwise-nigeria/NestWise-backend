const bcrypt = require('bcrypt')
const { error } = require('../../../utils/helpers')
const User = require('../../../models/userModel')

const newUser = async (firstname, lastname, email, phone, role, password) => {

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
            password: hashedPassword
        })

        if(!addUser){
            error(503, 'Service unavailable')
        }
        return addUser

    }
    catch(err){
        error(err.statusCode || 500, err.message || 'Internal server error')
    }
}

module.exports = {
    newUser
}