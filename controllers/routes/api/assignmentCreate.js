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
        let schedule_id = request.body.schedule_id;
        let date = Date.parse(request.body.date);


        //Check that data has been sent
        if((typeof token == "undefined") || (typeof schedule_id == "undefined") || (typeof request.body.date == "undefined")) //TODO try request.body.hasOwnProperty('token');
        {
            return response.status(400).json({errors: [{msg: "Missing data"}] });
        }


        //Check that data is valid
        if (validator.isEmpty(schedule_id))
        {
            return response.status(400).json({errors: [{msg: "schedule_id id is required"}] });
        }

        //Check that data is valid
        if (validator.isEmpty(request.body.date))
        {
            return response.status(400).json({errors: [{msg: "date is required"}] });
        }

        //Check that data is valid
        if (isNaN(date))
        {
            return response.status(400).json({errors: [{msg: "date invalid"}] });
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


        //Check schedule is in database
        let schedule = await Schedule.findOne({_id: schedule_id, user: user.id});
        if (!schedule)
        {
            return response.status(400).json({errors: [{msg: "Schedule not found"}]});
        }


        //Check calendar is in database
        let calendar = await Calendar.findOne({user: user.id});
        if (!calendar)
        {
            return response.status(400).json({errors: [{msg: "calendar not found"}]});
        }


        //Check assignment is already in database
        let assignment = await Assignment.findOne({date: new Date(date), user: user.id});
        if (assignment)
        {
            return response.status(400).json({errors: [{msg: "Assignment date already used"}]});
        }


        // //Check if date is already used
        // const foundCalendarAssignments = calendar.assignments.find(assignment => assignment.date.getTime() === date);
        // if(foundCalendarAssignments)
        // {
        //     return response.status(400).json({errors: [{msg: "Date is already used"}]});
        // }


        // console.log(calendar.assignments[0].date.getTime());

        const newAssignment = new Assignment({user: user.id, date: new Date(date), schedule: schedule_id});

        await newAssignment.save();

        calendar.assignments.unshift(newAssignment);
        await calendar.save();


        response.json(calendar);

    }
    catch (e)
    {
        console.error(e);
        return response.status(500).json({errors: [{msg: "Server error: " + e.message}]});
    }
}