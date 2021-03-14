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


        assignments:
            [
                {
                    assignment:
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'assignment'
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