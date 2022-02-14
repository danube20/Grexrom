const { Schema, model } = require('mongoose')

const profileSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        biography: {
            type: String,
            maxlength: 200
        },
        imgUrl: String,
    }
)