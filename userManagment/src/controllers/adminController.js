
import adminServices from '../services/adminServices.js'
import { sendMail } from "../utils/nodemailer.js";


const createRoles = async (req, res) => {
    try {
        const role = req.body.role;

        const data = await adminServices.createRole(role);
        res.status(200).send(data)
    } catch (error) {
        res.status(401).send(error.message)
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body
        if (!name) {
            res.status(405).send("name is required");
        }
        if (!email) {
            res.status(405).send("email is required");
        }
        if (!password) {
            res.status(405).send("password is required");
        }
        if (!role) {
            res.status(405).send("role is required");
        }
        if (!phone) {
            res.status(405).send("phone is required");
        }

        const data = await adminServices.createUser(req.body)
        const title = "DP user credential"
        await sendMail(email, title, `email:${email}            password:${password}`)
        res.status(200).send(data)
    } catch (error) {
        res.status(403).send(error.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.params.id
        console.log(req.params.id);
        if (!data) throw new Error("Empty field: data is required");

        const updatedFields = await adminServices.updateUser(data, userId)
        res.status(200).send(updatedFields)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        const data = await adminServices.getUser(id);
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getAllUser = async (req, res) => {
    try {

        const data = await adminServices.getAllUsers();
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getAllRoles = async (req, res) => {
    try {
        const data = await adminServices.getAllRoles();
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
}



export { createRoles, createUser, updateUser, getAllUser, getUser, getAllRoles } 