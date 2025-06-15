import userServices from "../services/userServices.js"
import { createJWT } from "../utils/jwt.js"


const createDmReport = async (req, res) => {
    try {
        const report = req.body
        if (!report.totalCalls) res.status(408).send("totalcalls required")
        if (!report.totalCoursesBought) res.status(408).send("Course BOught required")
        if (!report.totalInterested) res.status(408).send("Total Intrested required")
        // if (!report.remarks) res.status(408).send("Remarks required")

        const data = await userServices.createDmReport(report)
        console.log(data);
        console.log("u ran");
        res.status(200).send(data)
    } catch (error) {
        console.log("i ran");
        res.status(400).send(error.message);
    }
}

const createUserReport = async (req, res) => {
    try {
        const report = req.body
        const user = res.user;
        // console.log(user);
        // console.log(report);

        if (
            !report.tasks ||
            !Array.isArray(report.tasks) ||
            report.tasks.every(task => task.trim() === '')
        ) {
            return res.status(405).send("tasks required");
        }
        const data = await userServices.createUserReport(report, user)
        console.log(data);
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateUser = async (req, res) => {
    try {
        const user = req.user
        const data = req.body


        const updatedFields = await userServices.updateUser(data, user.email);

        const token = createJWT(updatedFields)
        res.cookie("authToken", token)
        res.status(200).send(updatedFields)
    } catch (error) {
        res.status(402).send(error.message);
    }
}

const getAllUserReport = async (req, res) => {
    try {
        console.log("running");
        const data = await userServices.getAllUserReport();
        console.log(data);
        res.status(200).send(data)
    } catch (error) {
        res.status(402).send(error.message)
    }
}

const getReportByUser = async (req, res) => {
    try {
        const reportUserId = req.params.userId

        const data = await userServices.getReportByUser(reportUserId);
        console.log(data);
        res.status(200).send(data)
    } catch (error) {
        res.status(402).send(error.message);
    }
}

const getReportById = async (req, res) => {
    try {
        const id = req.params.id
        const data = userServices.getReportById(id)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getAllDmReport = async (req, res) => {
    try {
        const data = await userServices.getAllDmReport();
        // console.log(data);

        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getDmReportById = async (req, res) => {
    try {
        const id = req.params.id

        const data = await userServices.getDmReportById(id);

        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateDmReport = async (req, res) => {
    try {
        console.log("iran");
        const id = req.params.id
        console.log("i am req", req.body);

        const data = await userServices.updateDmReport(req.body, id);
        console.log("respnse", data);
        res.status(200).send(data)
    } catch (error) {

        res.status(400).send(error.message)
    }
}
const getLatestDmReport = async (req, res) => {
    try {
        const data = await userServices.getLatestDmReport();
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send("error occured ")
    }
}

export { createDmReport, createUserReport, updateUser, getAllUserReport, getReportByUser, getReportById, getAllDmReport, getDmReportById, updateDmReport, getLatestDmReport }