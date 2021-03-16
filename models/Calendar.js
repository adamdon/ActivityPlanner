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
                }
            ],





    }
);

export let Calendar = mongoose.model('calendar', CalendarSchema);