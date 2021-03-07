import mongoose from "mongoose";


/**
 * @constructor Goal
 */
const GoalSchema = new mongoose.Schema
(
    {

        type:
            {
                type: String
            },

        target:
            {
                type: Number
            },

        achieved:
            {
                type: Number
            },

        complete:
            {
                type: Boolean
            }

    }
);

export let Goal = mongoose.model('goal', GoalSchema);