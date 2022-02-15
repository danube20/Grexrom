const { Schema, model } = require('mongoose')

const commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        commentDate: {
            type: Date,
            default: Date.now
        },
        commentary: {
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