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

    date:
        {
            type: Date,
            default: Date.now(),
        },


    goals:
        [
            {
                user:
                    {
                        type: mongoose.Schema.Types.ObjectId
                    },
            }
        ],
    }
);

export let Schedule = mongoose.model('schedule', ScheduleSchema);