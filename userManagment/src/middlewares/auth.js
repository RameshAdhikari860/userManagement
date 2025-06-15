import { verifyJWT } from "../utils/jwt.js";


const auth = (req, res, next) => {
    try {


        const cookie = req.headers.cookie;
        // console.log("i am cookie", cookie);

        if (!cookie) return res.status(401).send("User not authenticated");

        // for postman
        // const authToken = cookie.split('=')[1];   

        // for browser
        let authToken = cookie
            .split(';')
            .map(part => part.trim())
            .find(part => part.startsWith('authToken='))
            ?.split('=')[1];
        // if (!authToken) {
        //     authToken = cookie;
        //     console.log("not authToken", authToken);
        // }

        const data = verifyJWT(authToken)

        res.user = data.data;
        // console.log("from auth", authToken);
        // console.log(cookie);



        next();
    } catch (error) {
        res.send(error.message);
    }
}


export { auth }