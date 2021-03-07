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
                type: Number,
                default: 0,
            },

        complete:
            {
                type: Boolean,
                default: false,
            }

    }
);

export let Goal = mongoose.model('goal', GoalSchema);