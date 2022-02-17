const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'grexrom0122@gmail.com',
        pass: 'popino22'
    }
})

module.exports = transporter