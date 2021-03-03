import mongoose from "mongoose";


/**
 * @constructor User
 */
const UserSchema = new mongoose.Schema
(
    {
        name:
            {
                type: String,
                required: true,
            },
        email:
            {
                type: String,
                required: true,
                unique: true,
            },
        password:
            {
                type: String,
                required: true,
            },
        avatar:
            {
                type: String,
            },
        date:
            {
                type: Date,
                default: Date.now(),
            },
    }
);

export let User = mongoose.model('user', UserSchema);