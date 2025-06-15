import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        // required: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    remarks: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
        default: '',
    },
    condition: {
        type: String,
        // required: true,
        enum: ['interestedToBuy', 'purchased', 'general'],
        default: 'general'
    }
    ,
    courses: [{
        type: String,
        // required: true,
        trim: true,
    }],

    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true,
});

export default mongoose.model('Customers', personSchema);
