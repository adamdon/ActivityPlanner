import mongoose from "mongoose";
import validator from 'validator';
import {User} from "../../../models/User.js";
import {Schedule} from "../../../models/Schedule.js";
import {Goal} from "../../../models/Goal.js";

import validateToken from "../../utilities/validateToken.js";




export default async function (request, response)
{
    try
    {
        let token = request.body.token;
        let schedule_id = request.body.schedule_id;



        //Check that data has been sent
        if((typeof token == "undefined") || (typeof schedule_id == "undefined")) //TODO try request.body.hasOwnProperty('token');
        {
            return response.status(400).json({errors: [{msg: "Missing data"}] });
        }


        //Check that data is valid
        if (validator.isEmpty(schedule_id))
        {
            return response.status(400).json({errors: [{msg: "Schedule id is required"}] });
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

        //Loop thought all current goals in schedule
        let allGoalObjects = [];
        for (const goal_id of schedule.goals)
        {
            let indexGoal = await Goal.findOne({_id: goal_id});

            //Check and remove goal if is assigned to schedule but in not database anymore
            if(!indexGoal)
            {
                console.log("CLEANUP removed goal from schedule that was assigned to schedule but in not database anymore");
                schedule.goals = schedule.goals.filter(filterId => filterId._id === goal_id);
                await schedule.save();
            }
            else
            {
                allGoalObjects.push(indexGoal);
            }


        }


        response.json(allGoalObjects);

    }
    catch (e)
    {
        console.error(e);
        return response.status(500).json({errors: [{msg: "Server error: " + e.message}]});
    }
}