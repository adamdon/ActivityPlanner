import mongoose from "mongoose";


/**
 * @constructor Achievement
 */
const achievementSchema = new mongoose.Schema
(
    {


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

        user:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },


    }
);

export let Achievement = mongoose.model('achievement', achievementSchema);