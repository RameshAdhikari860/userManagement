import nodemailer from 'nodemailer';




const sendMail = async (to, subject, text) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        },
    })

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        text
    }
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('email sent' + info.response)
    } catch (error) {
        console.error('error sending email', error)
    }
}

export { sendMail };

