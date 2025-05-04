const bcrypt = require('bcryptjs')
const { error } = require('../../../utils/helpers')
const User = require('../../../models/userModel')
const Plan = require('../../../models/planModel')
const Subscription = require('../../../models/Subscription')
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
        //assign free plan to agents upon creation
        // check if newly created user is an agent
        if(addUser.role != 'renter'){
            const plan = await Plan.findOne({ where: { price: 0 }});
            const startDate = new Date();
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + plan.duration);

            await Subscription.create({
            agentId: addUser.id,
            planId: plan.id,
            startDate,
            endDate,
            isActive: true,
            });
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