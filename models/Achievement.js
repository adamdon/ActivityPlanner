import mongoose from "mongoose";


/**
 * @constructor Achievement
 */
const achievementSchema = new mongoose.Schema
(
    {

        user:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },

        type:
            {
                type: String
            },

        achieved:
            {
                type: Number,
            },

        date:
            {
                type: Date,
                default: Date.now,
            },

    }
);

export let Achievement = mongoose.model('achievement', achievementSchema);