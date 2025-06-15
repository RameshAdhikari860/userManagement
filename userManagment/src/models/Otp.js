import mongoose from "mongoose";


const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true,
    },
    isUsed: {
        type: Boolean,
        default: false
    },

    email: {
        type: String
    },
    expiresAt: {
        type: Date,
        required: true
    }
})


otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Otp", otpSchema);