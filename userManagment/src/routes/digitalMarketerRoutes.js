import express from "express";
import { createCustomers, getAllCustomers, getCustomerById, updateCustomers } from "../controllers/customerController.js";
import { auth } from "../middlewares/auth.js";
import { roleBasedAuth } from "../middlewares/roleBasedAuth.js";


const router = express.Router();

router.get('/getAllCustomer', auth, roleBasedAuth("DIGITAL MARKETER"), getAllCustomers)
router.get('/getCustomerById/:id', auth, roleBasedAuth('DIGITAL MARKETER'), getCustomerById)
// router.get("/", auth, roleBasedAuth("DIGITAL MARKETER"), (req, res) => { res.send("THis is customer page") })


router.post('/', auth, roleBasedAuth("DIGITAL MARKETER"), createCustomers)
router.post('/updateCustomer/:id', auth, roleBasedAuth("DIGITAL MARKETER"), updateCustomers)

export default router