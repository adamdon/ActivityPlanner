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
        let type = request.body.type;
        let target = parseInt(request.body.target);



        //Check that data has been sent
        if((typeof token == "undefined") || (typeof schedule_id == "undefined") || (typeof type == "undefined") || (typeof target == "undefined")) //TODO try request.body.hasOwnProperty('token');
        {
            return response.status(400).json({errors: [{msg: "Missing data"}] });
        }


        //Check that data is valid
        if (validator.isEmpty(schedule_id))
        {
            return response.status(400).json({errors: [{msg: "Schedule id is required"}] });
        }

        //Check that data is valid
        if (validator.isEmpty(type))
        {
            return response.status(400).json({errors: [{msg: "Type is required"}] });
        }

        //Check that data is valid
        if (target === 0)
        {
            return response.status(400).json({errors: [{msg: "Target must be above 0"}] });
        }

        //Check that data is valid
        if (target === null)
        {
            return response.status(400).json({errors: [{msg: "Target is required"}] });
        }


        //Check that data is valid
        if (isNaN(target))
        {
            return response.status(400).json({errors: [{msg: "Target must be a number"}] });
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



        //Check to see if "type" has already been set


        //Loop thought all current goals in schedule
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

            //Check to see if the type was already used
            if((indexGoal) && (indexGoal.type === type))
            {
                return response.status(400).json({errors: [{msg: "Goal type already set"}] });
            }

        }








        //Create new Goal
        let goal = new Goal({type: type, target: target});


        //Add Goal into schedule
        schedule.goals.unshift(goal);


        //Save changes
        await schedule.save();
        await goal.save();

        response.json(goal);

    }
    catch (e)
    {
        console.error(e);
        return response.status(500).json({errors: [{msg: "Server error: " + e.message}]});
    }
}