import express from "express";
import { createRoles, createUser, getAllRoles, getAllUser, getUser, updateUser } from "../controllers/adminController.js";
import { auth } from "../middlewares/auth.js";
import { roleBasedAuth } from "../middlewares/roleBasedAuth.js";
import { sendMail } from "../utils/nodemailer.js";


const router = express.Router()

// router.get('/', async (req, res) => {
//     const result = await sendMail("ourworld898@gmail.com", "test", "hello nodemailer")

//     res.json({
//         message: "admin page email sent",
//     })
// })

router.get('/getAllUser', auth, roleBasedAuth("ADMIN"), getAllUser)
router.get('/getAllRoles', auth, roleBasedAuth("ADMIN"), getAllRoles)
router.get('/getUser/:id', auth, roleBasedAuth("ADMIN"), getUser)

router.post('/role', auth, roleBasedAuth("ADMIN"), createRoles)
router.post('/user', auth, roleBasedAuth("ADMIN"), createUser)
router.post('/updateUser/:id', auth, roleBasedAuth("ADMIN"), updateUser)




export default router;