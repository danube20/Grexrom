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
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER'
        },
        // favs: {
        //     type: id de la api
        // }
    },
    {
        timestamps: true
    }
)

module.exports = model('User', userSchema)