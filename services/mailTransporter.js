import dotevn from 'dotenv'
dotevn.config()
import nodemailer from 'nodemailer'

export  const transporter = nodemailer.createTransport({

    service:'gmail',
    auth:{
        user:process.env.SPARK_MAIL,
        pass:process.env.MAIL_PASSKEY
    }
})