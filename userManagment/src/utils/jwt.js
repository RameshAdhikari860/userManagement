import jwt from "jsonwebtoken"


const createJWT = (data) => {
    return jwt.sign({ data }, process.env.JWT_SECRET)
}

const verifyJWT = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return error.message;
    }
};


export { createJWT, verifyJWT }