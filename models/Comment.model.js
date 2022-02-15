const { Schema, model } = require('mongoose')

const commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        artwork: {
            type: String
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        date: {
            type: Date,
            default: Date.now
        },
        text: {
            type: String,
            required: true,
            maxlength: 250
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('Comment', commentSchema)