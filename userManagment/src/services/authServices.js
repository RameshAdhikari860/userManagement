import Users from '../models/Users.js'
import bcrypt, { hashSync } from 'bcrypt'
import { sendMail } from '../utils/nodemailer.js';
import { generatePassword } from '../helpers/generatePassword.js';
import Otp from '../models/Otp.js';

const login = async (data) => {
    console.log(data);
    const email = data.email
    const user = await Users.findOne({ email: email });
    if (!user) {
        throw {
            statuscode: 400,
            message: "user didn't match"
        };
    }
    const hashedPassword = user.password
    const comparePassword = bcrypt.compareSync(data.password, hashedPassword)

    if (!comparePassword) {
        throw {
            statuscode: 400,
            message: "password didn't match"
        };
    }
    return user;
}


const forgotPassword = async (data) => {
    const title = "DP user credential, Expires after 8 min"
    const expiresAt = new Date(Date.now() + 600000)
    const emailExist = await Users.findOne({ email: data.email })
    if (!emailExist) {
        return;
    }
    const otp = generatePassword()
    // console.log(newPassword);
    // console.log(hashedPassword);

    const otpExist = await Otp.findOne({ email: data.email })
    if (otpExist) {
        await Otp.updateOne({ email: data.email }, { otp: otp, isUsed: false, expiresAt, email: data.email })
        return await sendMail(data.email, title, `email:${data.email} \n Otp:${otp}`)


    }

    await Otp.create({ otp: otp, isUsed: false, expiresAt, email: data.email })
    return await sendMail(data.email, title, `email:${data.email} \n Otp:${otp}`)




    // send email

    // const hashedPassword = bcrypt.hashSync(newPassword, 8);
    // await Users.findOneAndUpdate({ email: data.email }, { password: hashedPassword }, { new: true })

}

// const resetPassword = async (data) => {
//     const email = data.email;
//     const otp = data.otp;
//     console.log(email, otp);


//     const hashedPassword = bcrypt.hashSync(otp, 8);
//     const title = "Your DP user login Credential"


//     const otpExist = await Otp.findOne({ email })
//     console.log(otpExist);
//     if (otpExist) {
//         if (otpExist.otp === otp && otpExist.email === email) {
//             await Otp.updateOne({ email }, { isUsed: true })
//             await Users.findOneAndUpdate({ email: data.email }, { password: hashedPassword }, { new: true })
//             await sendMail(data.email, title, `email:${data.email} \n Otp:${otp}`)
//             return;
//         }
//     }
// }
const resetPassword = async (data) => {
    const { email, otp } = data;
    const title = "Your DP user login Credential";

    const otpEntry = await Otp.findOne({ email });
    // console.log("otp Entry", otpEntry);

    // Step 1: Check if OTP exists
    if (!otpEntry) {
        console.log("OTP not found");
        return;
    }

    // Step 2: Check if OTP is used
    if (otpEntry.isUsed) {
        console.log("OTP already used");
        return;
    }

    // Step 3: Check if OTP is expired
    if (otpEntry.expiresAt < new Date()) {
        console.log("OTP expired");
        return;
    }

    // Step 4: Match OTP
    if (otpEntry.otp !== otp) {
        console.log("Invalid OTP");
        return;
    }

    // Step 5: Everything is valid — update password
    const hashedPassword = bcrypt.hashSync(otp, 8);
    // console.log("fianl password", hashedPassword);
    await Users.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
    );

    // Step 6: Mark OTP as used
    await Otp.updateOne({ email }, { isUsed: true });

    // Step 7: Send confirmation mail
    await sendMail(
        email,
        title,
        `Email: ${email} \nYour new password: ${otp}`
    );
};



export default { login, forgotPassword, resetPassword };