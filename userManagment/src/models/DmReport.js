import mongoose from 'mongoose';

const dmReportSchema = new mongoose.Schema({


    totalCalls: {
        type: Number,
        required: true,
        default: 0,
    },
    totalCoursesBought: {
        type: Number,
        required: true,
        default: 0,
    },
    totalInterested: {
        type: Number,
        required: true,
        default: 0,
    },
    remarks: {
        type: String,
        trim: true,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }, date: {
        type: String,
        default: new Date().toLocaleDateString('en-CA')
    }
});

export default mongoose.model('DmReport', dmReportSchema);
