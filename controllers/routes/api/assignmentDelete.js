import mongoose from "mongoose";
import validator from 'validator';
import {User} from "../../../models/User.js";
import {Schedule} from "../../../models/Schedule.js";
import {Goal} from "../../../models/Goal.js";
import {Calendar} from "../../../models/Calendar.js";
import {Assignment} from "../../../models/Assignment.js";


import validateToken from "../../utilities/validateToken.js";




export default async function (request, response)
{
    try
    {
        let token = request.body.token;
        let assignment_id = request.body.assignment_id;




        //Check that data has been sent
        if((typeof token == "undefined") || (typeof assignment_id == "undefined"))
        {
            return response.status(400).json({errors: [{msg: "Missing data"}] });
        }


        //Check that data is valid
        if (validator.isEmpty(token))
        {
            return response.status(400).json({errors: [{msg: "token is required"}] });
        }


        //Check that data is valid
        if (validator.isEmpty(assignment_id))
        {
            return response.status(400).json({errors: [{msg: "assignment_id is required"}] });
        }


        //Check that token is valid
        let validateResult = validateToken(token);
        if(validateResult === "invalid")
        {
            return response.status(400).json({errors: [{msg: validateResult}] });
        }


        //Check user is in database
        let user = await User.findById(validateResult.user.id).select("-password");
        if(!user)
        {
            return response.status(400).json({errors: [{msg: "User not found"}] });
        }


        //Check calendar is in database
        let calendar = await Calendar.findOne({user: user.id});
        if (!calendar)
        {
            return response.status(400).json({errors: [{msg: "calendar not found"}]});
        }



        //Check assignment is already in database
        let assignment = await Assignment.findOne({ _id: assignment_id});
        if (!assignment)
        {
            return response.status(400).json({errors: [{msg: "No assignments found"}]});
        }

        calendar.assignments = calendar.assignments.filter(assignment => !(assignment.id === assignment_id));


        await calendar.save();
        await assignment.remove();



        response.json(calendar);

    }
    catch (e)
    {
        console.error(e);
        return response.status(500).json({errors: [{msg: "Server error: " + e.message}]});
    }
}