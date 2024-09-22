const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required!"],
        },

        lastName: {
            type: String,
            required: [true, "Last name is required!"],
        },

        email: {
            type: String,
            required: [true, "Email is required!"],
        },

        password: {
            type: String,
            required: [true, "Password is required!"]
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("Product", UserSchema)
module.exports = User