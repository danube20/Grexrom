const { Schema, model, Types, Mongoose } = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Indica el email.'],
            unique: true,
            lowercase: true,
            trim: true
        },
        userPassword: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER'
        },
        favs: {
            type: [String]
        },
        biography: {
            type: String,
            maxlength: 200
        },
        imgUrl: {
            type: String,
            default: 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('User', userSchema)