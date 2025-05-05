const { error } = require('../../../utils/helpers')
const authServices = require('../services/authServices')
const registerUser = async(req, res) => {
    try{
        const { firstname, lastname, email, phone, role, password, nationality, dob, idType, idNumber, idPicture, profilePicture } = req.body
        const response = await authServices.newUser(firstname, lastname, email, phone, role, password, nationality, dob, idType, idNumber, idPicture, profilePicture);
        if(!response) error(503, 'Service unavailable')

        res.status(201).json({ success: true, message: 'User account created successfully', data: response})
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message });
    }
}

//login user
const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body
        const response = await authServices.loginUser(email, password)
        if(!response) error(503, 'Service unavailable')

        res.status(200).json({ success: true, message: 'login succcessful', data: response})
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message })
    }
}

module.exports = {
    registerUser,
    loginUser
}