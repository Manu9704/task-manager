const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req,res,next) => {
    const header = req.header('Authorization');
    if(!header) return res.status(401).json({message: 'No Token'});

    const token = header.split(' ')[1];
    if(!token) return res.status(401).json({message: 'No Token'});

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.id).select('-password');
        if(!user) return res.status(401).json({message: 'Invalid token'});
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({message: 'Token is not valid'})
    }
}