import mongoose from "mongoose";
import validator from 'validator';
import {User} from "../../../models/User.js";
import {Schedule} from "../../../models/Schedule.js";
import {Goal} from "../../../models/Goal.js";
import {Calendar} from "../../../models/Calendar.js";
import {Achievement} from "../../../models/Achievement.js";


import validateToken from "../../utilities/validateToken.js";




export default async function (request, response)
{
    try
    {
        let token = request.body.token;
        let date = Date.parse(request.body.date);
        let type = request.body.type;
        let achieved = request.body.achieved;


        //Check that data has been sent
        if((typeof token == "undefined") || (typeof type == "undefined") || (typeof request.body.date == "undefined") || (typeof achieved == "undefined") ) //TODO try request.body.hasOwnProperty('token');
        {
            return response.status(400).json({errors: [{msg: "Missing data"}] });
        }


        //Check that data is valid
        if (validator.isEmpty(type))
        {
            return response.status(400).json({errors: [{msg: "type id is required"}] });
        }


        //Check that data is valid
        if (isNaN(achieved))
        {
            return response.status(400).json({errors: [{msg: "achieved should be a number"}] });
        }


        //Check that data is valid
        if (achieved === 0)
        {
            return response.status(400).json({errors: [{msg: "achieved needs to be more than 0"}] });
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



        //Check calendar is in database
        let calendar = await Calendar.findOne({user: user.id});
        if (!calendar)
        {
            return response.status(400).json({errors: [{msg: "calendar not found"}]});
        }



        const newAchievement = new Achievement({user: user.id, date: new Date(date), type: type, achieved: achieved});

        await newAchievement.save();

        calendar.achievements.unshift(newAchievement);
        await calendar.save();


        response.json(calendar);

    }
    catch (e)
    {
        console.error(e);
        return response.status(500).json({errors: [{msg: "Server error: " + e.message}]});
    }
}