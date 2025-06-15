import Customers from "../models/Customers.js";


const createCustomers = async (data) => {

    try {

        return await Customers.create(data)
    } catch (error) {
        console.log(error.message);
    }
}

const updateCustomers = async (data, id) => {
    const updatedFields = {};

    if (data.name) updatedFields.name = data.name;
    if (data.phone) updatedFields.phone = data.phone;
    if (data.email) updatedFields.email = data.email;
    if (data.remarks) updatedFields.remarks = data.remarks;
    if (data.address) updatedFields.address = data.address;
    if (data.condition) updatedFields.condition = data.condition;
    if (Array.isArray(data.courses) && data.courses.length > 0) {
        updatedFields.courses = data.courses;
    }

    return Customers.findByIdAndUpdate(id, updatedFields, { new: true })
}

const getAllCustomers = async (filter = {}) => {
    // Build filter object dynamically based on provided values
    const query = {};

    if (filter.name) {
        query.name = new RegExp(filter.name, 'i'); // case-insensitive search
    }

    if (filter.email) {
        query.email = new RegExp(filter.email, 'i'); // case-insensitive search
    }

    if (filter.phone) {
        query.phone = new RegExp(filter.phone, 'i'); // case-insensitive search
    }

    // If no filters, return all customers
    return await Customers.find(query).sort({ createdAt: -1, _id: -1 });
};

const getCustomerById = async (id) => {
    return await Customers.findById(id);
}


export default { createCustomers, updateCustomers, getAllCustomers, getCustomerById }