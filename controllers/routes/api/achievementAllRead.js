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



        //Check that data has been sent
        if((typeof token == "undefined")) //TODO try request.body.hasOwnProperty('token');
        {
            return response.status(400).json({errors: [{msg: "Missing data"}] });
        }


        //Check that data is valid
        if (validator.isEmpty(token))
        {
            return response.status(400).json({errors: [{msg: "token id is required"}] });
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
        let achievements = await Achievement.find({ user: user.id}).sort({date: -1});
        if (!achievements)
        {
            return response.status(400).json({errors: [{msg: "No achievements found"}]});
        }



        response.json(achievements);



    }
    catch (e)
    {
        console.error(e);
        return response.status(500).json({errors: [{msg: "Server error: " + e.message}]});
    }
}