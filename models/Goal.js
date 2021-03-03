import mongoose from "mongoose";


/**
 * @constructor Goal
 */
const GoalSchema = new mongoose.Schema
(
    {
        title:
            {
                type: String
            },

        user:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },

        date:
            {
                type: Date,
                default: Date.now(),
            },


        goals:
            [
                {
                    goal:
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'goal'
                        },
                }
            ],
    }
);

export let Goal = mongoose.model('goal', GoalSchema);