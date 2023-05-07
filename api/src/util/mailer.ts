import nodemailer from 'nodemailer'
import { Email } from '../@types/mailer'
import { SMTP_PASSWORD, SMTP_USERNAME } from './secrets'

const sendEmail = async (emailContent: Email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
      },
    })

    const mailOptions = {
      from: SMTP_USERNAME,
      to: emailContent.email,
      subject: emailContent.subject,
      html: emailContent.html,
    }

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`Error occured while sending the email: ${error.message}`)
      } else {
        console.log(`The email is sent: ${info.response}`)
      }
    })
  } catch (error: any) {
    console.log(`Could not send the email: ${error.message}`)
  }
}

export default sendEmail
