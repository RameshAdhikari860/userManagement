import express from 'express'
import { forgotPassword, login, logout, resetPassword } from '../controllers/authController.js';

const router = express.Router();


router.get("/", (req, res) => {

    res.json({ message: "auth ROute running" })

})

router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)
router.post('/logout', logout)


export default router