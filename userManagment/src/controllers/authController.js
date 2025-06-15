import authServices from "../services/authServices.js";
import { createJWT } from "../utils/jwt.js";


const login = async (req, res) => {
    try {
        const data = req.body

        if (!data.email) {
            res.status(400).send("email  required");
        }
        if (!data.password) {
            res.status(400).send("password  required");
        }
        const user = await authServices.login(data)

        const token = createJWT(user)
        res.cookie("authToken", token)

        res.status(200).send(user)
    } catch (error) {
        res.status(401).send(error.message)
    }
}

const forgotPassword = async (req, res) => {
    try {
        const email = req.body
        const data = await authServices.forgotPassword(email);
        res.status(200).send("otp sent")
    } catch (error) {
        res.status(400).send("error occurred " + error.message + "hehe");
    }
}

const resetPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const otp = req.body.otp;
        const data = await authServices.resetPassword({ email, otp });
        res.status(200).send("Password reset successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie("authToken");
        res.status(200).send("Logged out successfully");
    } catch (error) {
        res.status(400) > send("logout failed")
    }
}

export { login, forgotPassword, logout, resetPassword }