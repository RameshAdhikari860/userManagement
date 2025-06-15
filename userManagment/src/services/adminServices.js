
import Roles from '../models/Roles.js'
import Users from '../models/Users.js'
import bcrypt from 'bcrypt'


const createRole = async (data) => {

    return await Roles.create({
        role: data
    })
}

const createUser = async (data) => {
    const { name, email, password, phone } = data


    const roleUpper = (data.role).toUpperCase();
    const role = await Roles.findOne({ role: roleUpper });

    if (!role) {
        throw new Error("Role not found");

    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    return await Users.create({
        name: data.name,
        email,
        password: hashedPassword,
        phone,
        role: role._id,
        roleName: role.role
    })
}

const updateUser = async (data, id) => {
    const updatedFields = {}
    if (data.email) updatedFields.email = data.email;
    if (data.name) updatedFields.name = data.name;
    if (data.phone) updatedFields.phone = data.phone;
    console.log(id);

    return await Users.findOneAndUpdate({ _id: id }, updatedFields, { new: true })
}

const getAllUsers = async () => {
    return Users.find().sort({ _id: -1 });
}

const getUser = async (id) => {
    return Users.findById({ _id: id })
}

const getAllRoles = async () => {
    return Roles.find().sort({ _id: -1 });
}

export default { createRole, createUser, updateUser, getUser, getAllUsers, getAllRoles };