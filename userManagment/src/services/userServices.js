import DmReport from '../models/DmReport.js'
import UserReport from '../models/UserReport.js'
import Users from '../models/Users.js'


const createDmReport = async (data) => {

    const dateNow = new Date().toLocaleDateString('en-CA')
    const reportExist = await DmReport.findOne({ date: dateNow })
    if (!reportExist) {
        return await DmReport.create({
            totalCalls: data.totalCalls,
            totalCoursesBought: data.totalCoursesBought,
            totalInterested: data.totalInterested,
            remarks: data.remarks
        })
    } else {

        throw new Error("Today's report already Exists")
    }


}

const createUserReport = async (data, user) => {

    return await UserReport.create({
        task: data.tasks,
        remarks: data.remarks,
        createdBy: user.name,
        createdById: user._id
    })
}


const updateUser = async (data, userEmail) => {
    const updateFields = {};

    if (data.phone) updateFields.phone = data.phone;
    if (data.name) updateFields.name = data.name;


    const updatedFields = await Users.findOneAndUpdate({ email: userEmail }, updateFields, { new: true });

    return updatedFields;
}

const getAllUserReport = async () => {

    return await UserReport.find().sort({ createdAt: -1, _id: -1 });
}

const getReportByUser = async (id) => {
    return await UserReport.find({ createdById: id }).sort({ createdAt: -1, _id: -1 })
}
const getReportById = async (id) => {
    return await UserReport.findById(id);
}

const getAllDmReport = async () => {
    return await DmReport.find().sort({ createdAt: -1, _id: -1 });
}

const getDmReportById = async (id) => {

    return await DmReport.findById(id);
}

const updateDmReport = async (data, id) => {
    console.log("data from service", data);
    console.log("id", id);
    return await DmReport.findOneAndUpdate({ _id: id }, data, { new: true })
}

const getLatestDmReport = async () => {
    const latestReport = await DmReport.findOne().sort({ createdAt: -1 });
    console.log(latestReport);
    return latestReport;

}
export default { createDmReport, createUserReport, updateUser, getAllUserReport, getReportByUser, getReportById, getDmReportById, getAllDmReport, updateDmReport, getLatestDmReport }