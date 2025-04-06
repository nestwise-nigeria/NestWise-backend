const jwt = require('jsonwebtoken');
const  User  = require('../models/userModel'); // Ensure the correct path

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1]; // Expect "Bearer <token>"
        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure `JWT_SECRET` is set in `.env`
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid token." });
        }

        req.user = user; // Attach user data to request
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};

const authorize = async (req, res, next)=> {
    try{
        const user = req.user
        if(!user){
            return res.status(401).json({ success: false, message: "Invalid token, please login to continue"})
        }
        const role = user.role
        if(role == 'renter'){
            return res.status(403).json( { success: false, message: "Unauthorized"})
        }

        next();
    }
    catch(err){
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
    
}


module.exports = {
    authenticate,
    authorize
}