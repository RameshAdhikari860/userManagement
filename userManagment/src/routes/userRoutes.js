import express from "express"
import { createDmReport, createUserReport, getAllDmReport, getAllUserReport, getDmReportById, getLatestDmReport, getReportById, getReportByUser, updateDmReport, updateUser } from "../controllers/userController.js"
import { auth } from "../middlewares/auth.js"
import { roleBasedAuth } from "../middlewares/roleBasedAuth.js"


const router = express.Router()

router.get("/", (req, res) => {
    res.send("User Route Pager")
})

router.post("/dmReport", auth, createDmReport)
router.post("/userReport", auth, createUserReport)
router.post("/userUpdate", auth, updateUser)
router.post("/updateDmReport/:id", auth, updateDmReport)


router.get('/reportById', auth, getReportById)
router.get('/allUserReport', auth, getAllUserReport)
router.get('/allDmReport', auth, roleBasedAuth("DIGITAL MARKETER"), getAllDmReport)
router.get('/dmReportById/:id', auth, getDmReportById)
router.get('/reportByUser/:userId', auth, getReportByUser)
router.get('/getLatestDmReport', auth, getLatestDmReport)



export default router