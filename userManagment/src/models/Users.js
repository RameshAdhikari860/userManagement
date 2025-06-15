// models/userModel.js

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
        },
        phone: {
            type: String,
            unique: true,
            required: [true, 'Phone number is required']
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Roles',
            required: [true, 'role is required']
        },
        roleName: {
            type: String,
        }
    },
    { timestamps: true }
);


const model = mongoose.model('User', UserSchema);

export default model;
