const {Router} = require("express");

const authController = require("../controllers/auth.controller")
const authMiddleWare = require("../middlewares/auth.middleware")
const authRouter = Router();




/**
 * @routes POST /api/auth/register
 * @description Register a new user 
 * @access  Public
 */
authRouter.post("/register", authController.userControllerRegister )


/**
 * @routes POST /api/auth/login
 * @description login a  user 
 * @access  Public
 */
authRouter.post("/login", authController.userControllerLogin)

/**
 * @routes Get /api/auth/logout
 * @description logout a user
 * @access Public
 */
authRouter.get("/logout", authController.userControllerLogout)

/**
 * @routes get /api/auth/get-me
 * @description get the current logged in user details
 * @access Private
 */
authRouter.get("/get-me", authMiddleWare.authUser, authController.getMeController)

/**
 * @routes PUT /api/auth/update
 * @description update user profile (username and email)
 * @access Private
 */
authRouter.put("/update", authMiddleWare.authUser, authController.updateUserController)

module.exports = authRouter;