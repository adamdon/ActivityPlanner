import mongoose from "mongoose";


/**
 * @constructor Assignment
 */
const AssignmentSchema = new mongoose.Schema
(
    {

        user:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },

        date:
            {
                type: Date,
            },

        schedule:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'schedule'
            },


    }
);

export let Assignment = mongoose.model('assignment', AssignmentSchema);