const User = require('../models/users.model');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const Checkout = require('../models/checkout.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
    //console.log(req.body);
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ msg: "Please fill in all fields" });
        if (!validateEmail(email)) return res.status(400).json({ msg: "Invalid email" });
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'the email already exists' });
        //console.log(password);
        if (password.length < 6)
            return res.status(400).json({ msg: 'Password it at least 6 character long' });
        //encrypt Password
        const passwordHash = await bcrypt.hash(password, 10);
        //sendgrid
        const newUser = new User({
            name, email, password: passwordHash
        })

        await newUser.save();

        //Then create jwt to auth
        const accesstoken = createAccessToken({ id: newUser._id });
        const refreshtoken = createRefreshToken({ id: newUser._id });

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 7 * 24 * 60 * 60 * 1000 //7day
        })

        return res.status(200).json({ accesstoken })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //console.log(req.body, "asdasd");
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "user doesn't exists" });
        if (user.isBlock === true) return res.status(400).json({ msg: "Your account has been locked" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Wrong password!!!" });
        const accesstoken = createAccessToken({ id: user._id });
        const refreshtoken = createRefreshToken({ id: user._id });

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 7 * 24 * 60 * 60 * 1000 //7day
        })
        return res.status(200).json({ accesstoken })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
module.exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({ users })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) return res.status(400).json({ msg: "user doesn't exists" });
        return res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
        res.json({ msg: "Logged out" });
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
module.exports.refreshToken = async (req, res) => {
    //console.log(req.cookies);
    const rf_token = req.cookies.refreshtoken;
    try {
        if (!rf_token)
            return res.status(400).json({ msg: "Please login or register" });
        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SCERET, (err, user) => {
            if (err) res.status(400).json({ msg: err })
            const accesstoken = createAccessToken({ id: user.id });
            res.json({ user, accesstoken });
        })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }

}
module.exports.addCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) return res.status(400).json({ msg: "User does not exists" });
        await User.findOneAndUpdate({ _id: req.user.id }, { cart: req.body.cart })
        return res.status(200).json("Added to cart");
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
module.exports.getAddress = async (req, res) => {
    console.log(req.user);
    const user = await User.findById(req.user.id)
    if (!user) return res.status(400).json({ msg: "User does not exists" });
    const address = await User.findById(req.user.id).select('address')
    console.log(address);
    res.json({ address })
}
module.exports.addAddress = async (req, res) => {
    console.log(req.body, 'body');
    try {
        const user = await User.findById(req.user.id)
        if (!user) return res.status(400).json({ msg: "User does not exists" });
        if (req.body.name.length === 0 || req.body.name.length >= 30) return res.status(400).json({ msg: "Form is not format" });
        if (req.body.phone.length !== 10) return res.status(400).json({ msg: "Please enter the correct phone number" });
        await User.findOneAndUpdate({ _id: req.user.id }, {
            addresses: [...user.addresses, req.body]
        })
        return res.status(200).json("Add address");
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
module.exports.removeItem = async (req, res) => {
    console.log(req.body, 'body');
    try {
        const user = await User.findById(req.user.id)
        if (!user) return res.status(400).json({ msg: "User does not exists" });
        await User.findOneAndUpdate({ _id: req.user.id }, {
            addresses: req.body.addresses
        })
        return res.status(200).json("Add address");
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
module.exports.history = async (req, res) => {
    try {
        const feature = new APIfeature(Checkout.find({ userId: req.user.id }), req.query).sorting()
        const history = await feature.query;
        return res.status(200).json(history)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email })
        console.log(user);
        if (!user || user.role === 1) return res.status(400).json({ msg: "this email does not exists" });
        const activationtoken = activationToken({ id: user._id })
        const sendMail = {
            to: user.email,
            from: process.env.MAIL,
            subject: 'Reset Password for this email',
            text: 'and easy to do anywhere, even with Node.js',
            html: `<a='href'>${process.env.CLIENT_URL}/user/reset/${activationtoken}</a>`,
        };
        sgMail.send(sendMail);
        return res.status(200).json({ msg: "please check your email" });
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
module.exports.resetPassword = async (req, res, next) => {
    try {
        const { verify } = req.params;
        const { password } = req.body
        if (!verify) return res.status(400).json({ msg: "Invalid Authentication" });
        if (password.length < 6) return res.status(400).json({ msg: 'Password it at least 6 character long' });
        jwt.verify(verify, process.env.ACTIVATION_TOKEN_SCERET, async (err, user) => {
            if (!user) {
                return res.status(400).json({ msg: err.name })
            }
            const passwordHash = await bcrypt.hash(password, 10);
            await User.findByIdAndUpdate({ _id: user.id }, { password: passwordHash })
            return res.status(200).json({ msg: "Change password successfully. Please login to continue" });
            next();
        })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
module.exports.changeAccount = async (req, res) => {
    try {
        const user = req.params;
        await User.findByIdAndUpdate({ _id: user.id }, { isBlock: req.body.isBlock })
        return res.status(200).json({ msg: "blocked" })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
module.exports.changePassword = async (req, res) => {
    try {
        const param = req.params;
        console.log(param.id, 'xxx');
        const { password, newPassword, confirmPassword } = req.body;
        console.log(password, newPassword, confirmPassword);
        const user = await User.findOne({ _id: param.id })
        if (!user) {
            console.log("xxxx");
            return res.status(400).json({ msg: "user doesn't exists" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "The password you entered is incorrect" })
        if (newPassword.length < 6) return res.status(400).json({ msg: 'Password it at least 6 character long' });
        if (newPassword !== confirmPassword) return res.status(400).json({ msg: 'Password confirmation failed' });
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate({ _id: user.id }, { password: passwordHash })
        return res.status(200).json({ msg: "Change password successfully. Please login to continue" });
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}



const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SCERET, { expiresIn: "10m" });
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SCERET, { expiresIn: "7d" });
}
const activationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_TOKEN_SCERET, { expiresIn: "1m" });
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
class APIfeature {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString } //queryString = req.query
        //console.log({ before: queryObj });//before delete page...use pagination
        const excludeFields = ['page', 'sort', 'limit'];
        excludeFields.forEach(el => delete (queryObj[el]));
        //console.log({ after: queryObj }) //after delete page...
        let queryStr = JSON.stringify(queryObj);
        //console.log({ queryObj, queryStr });
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);
        //gte >=
        //gt >
        //lt < || 
        //lte <=
        //regex = tim kiem
        //console.log({ queryObj, queryStr });
        this.query.find(JSON.parse(queryStr));
        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query.sort('-createdAt');
        }
        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}