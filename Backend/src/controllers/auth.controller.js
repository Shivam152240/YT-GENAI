const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const env = require("dotenv")
const tokenBlackListModel = require("../models/blacklist.model.js")

/**
 * @name userControllerRegister
 * @description register new user, expect email, username or password in the require
 * @access Public
 * 
 */
async function userControllerRegister(req, res) {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'please provid the username, email, password'
        })
    }
    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ username }, { email }]
    })
    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "Acconut is already exist with this email or username"
        })
    }
    const hash = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username,
        email,
        password: hash
    })
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
});

    res.status(201).json({
        message: "user register successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,

        }
    })

}

/**
 * @name userControllerLogin
 * @description login  user, expect email,  password in the require
 * @access Public
 * 
 */
async function userControllerLogin(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: "invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "invalid email or password"
        })
    }
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
});
    res.status(200).json({
        message: "User LoggedIn successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}
/**
 * @name userControllerLogout
 * @description logout user
 * @access Public
 */
async function userControllerLogout(req, res) {

    const token = req.cookies.token
    if (token) {
         await tokenBlackListModel.create({ token })
        
    }
    res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
});
    res.status(200).json({
        message: "user logout successfully"
    })
}

/**
 * @name getMecontroller
 * @description get the current logged in user details , expect token in the reuiest cookies
 * @access Private
*/
async function getMeController(req, res){
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message : "details featch succeessfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }
    })
}

/**
 * @name updateUserController
 * @description update user profile (username and email)
 * @access Private
*/
async function updateUserController(req, res){
    const { username, email } = req.body
    
    if(!username || !email) {
        return res.status(400).json({
            message: "Username and email are required"
        })
    }

    try {
        const user = await userModel.findByIdAndUpdate(
            req.user.id,
            { username, email },
            { new: true, runValidators: true }
        )

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch(err) {
        res.status(400).json({
            message: err.message || "Error updating user"
        })
    }
}

module.exports = { userControllerRegister, userControllerLogin, userControllerLogout, getMeController, updateUserController }