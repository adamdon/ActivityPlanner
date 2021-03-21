import mongoose from "mongoose";


/**
 * @constructor Assignment
 */
const AssignmentSchema = new mongoose.Schema
(
    {

        date:
            {
                type: Date,
            },

        schedule:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'schedule'
            },

        user:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },



    }
);

export let Assignment = mongoose.model('assignment', AssignmentSchema);