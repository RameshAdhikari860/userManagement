import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'Role should be provided'],
        unique: true,
        set: (v) => v.toUpperCase()

    }
})




const model = mongoose.model('Role', UserSchema)

export default model