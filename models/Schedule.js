import mongoose from "mongoose";


/**
 * @constructor Schedule
 */
const ScheduleSchema = new mongoose.Schema
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

    date:
        {
            type: Date,
            default: Date.now,
        },



    }
);

export let Schedule = mongoose.model('schedule', ScheduleSchema);