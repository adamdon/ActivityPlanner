import mongoose from "mongoose";
import validator from 'validator';
import {User} from "../../../models/User.js";
import {Schedule} from "../../../models/Schedule.js";
import {Goal} from "../../../models/Goal.js";
import {Calendar} from "../../../models/Calendar.js";
import {Assignment} from "../../../models/Assignment.js";
import {Achievement} from "../../../models/Achievement.js";



import validateToken from "../../utilities/validateToken.js";




export default async function (request, response)
{
    try
    {
        let assignment_id = request.body.assignment_id;



        //Check that data has been sent
        if((typeof assignment_id == "undefined")) //TODO try request.body.hasOwnProperty('token');
        {
            return response.status(400).json({errors: [{msg: "Missing data"}] });
        }


        //Check assignment is already in database
        let assignment = await Assignment.findOne({ _id: assignment_id});
        if (!assignment)
        {
            return response.status(400).json({errors: [{msg: "No assignments found"}]});
        }


        //Check user is in database
        let user = await User.findById(assignment.user._id).select(["-password", "-email"]);
        if(!user)
        {
            return response.status(400).json({errors: [{msg: "User not found"}] });
        }


        //Check calendar is in database
        let calendar = await Calendar.findOne({user: user.id})
            .populate('achievements')
            .populate({path: "assignments", populate: {path: "schedule", populate: {path: "goals"}}})
            .populate('user', ["-password", "-email"]);

        if (!calendar)
        {
            return response.status(400).json({errors: [{msg: "calendar not found"}]});
        }



        response.json(calendar);

    }
    catch (e)
    {
        console.error(e);
        return response.status(500).json({errors: [{msg: "Server error: " + e.message}]});
    }
}