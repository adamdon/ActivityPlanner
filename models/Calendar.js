import mongoose from "mongoose";


/**
 * @constructor Calendar
 */
const CalendarSchema = new mongoose.Schema
(
    {

        user:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },


        schedules:
            [
                {
                    schedule:
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'schedule'
                        },

                    date:
                        {
                            type: Date,
                        },
                }
            ],

        achievements:
            [
                {
                    achievement:
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'achievement'
                        },

                    date:
                        {
                            type: Date,
                            default: Date.now,
                        },
                }
            ],





    }
);

export let Calendar = mongoose.model('calendar', CalendarSchema);