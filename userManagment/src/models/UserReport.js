import mongoose, { Mongoose } from "mongoose";

const userReportSchema = new mongoose.Schema({
    task: {
        type: [String],
        required: [true, "task must be added"]
    },
    remarks: {
        type: String,
        default: " ",
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    createdById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    createdBy: {
        type: String,
    }
})


export default mongoose.model('UserReport', userReportSchema);