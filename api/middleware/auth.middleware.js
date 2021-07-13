const jwt = require('jsonwebtoken');
const Users = require('../models/users.model');

module.exports.auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(400).json({ msg: "Invalid Authentication" });
        jwt.verify(token, process.env.ACCESS_TOKEN_SCERET, (err, user) => {
            //console.log(user);
            if (err) return res.status(400).json({ msg: "Invalid Authentication" });
            req.user = user;
            next();
        })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
module.exports.authAdmin = async (req, res, next) => {
    try {
        // console.log(req.user);
        const user = await Users.findOne({ _id: req.user.id })
        // console.log(user);
        // console.log(user.role);
        if (user.role === 0) return res.status(400).json({ msg: "Admin resource access denied" });
        next();
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}