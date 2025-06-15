import customerServices from "../services/customerServices.js"


const createCustomers = async (req, res) => {
    try {

        const customer = req.body

        const data = await customerServices.createCustomers(customer)

        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateCustomers = async (req, res) => {
    try {
        const data = req.body
        console.log(data);
        if (!data) throw new Error("update Data required")
        const customerId = req.params.id
        const updatedFields = await customerServices.updateCustomers(data, customerId)
        res.status(200).send(updatedFields)
    } catch (error) {
        res.status(402).send(error.message);
    }
}

const getAllCustomers = async (req, res) => {
    try {
        // console.log("hello");
        const data = await customerServices.getAllCustomers(req.query);
        res.status(200).send(data)

    } catch (error) {
        res.status(402).send(error.message);
    }
}

const getCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id
        const data = await customerServices.getCustomerById(customerId)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export { createCustomers, updateCustomers, getAllCustomers, getCustomerById }