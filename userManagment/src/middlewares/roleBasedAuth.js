import Roles from '../models/Roles.js'

const roleBasedAuth = (testRole) => {
    return async (req, res, next) => {

        try {
            const user = res.user
            // console.log("from roleBased auth", user);
            const roleId = user.role

            const roleObj = await Roles.findById(roleId);

            if (!roleObj) return res.status(401).send("User not authorized")
            if (roleObj.role === "ADMIN" || roleObj.role === testRole) {
                next();
            } else {
                return res.status(402).send("Not authorized");
            }

        } catch (error) {
            res.status(405).send(error.message);
        }


    }
}



export { roleBasedAuth }