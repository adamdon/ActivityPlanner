import validator from 'validator';
import {User} from "../../../models/User.js";
import {Schedule} from "../../../models/Schedule.js";

import validateToken from "../../utilities/validateToken.js";




export default async function (request, response)
{
    try
    {
        let title = request.body.title;
        let token = request.body.token;



        if((typeof title == "undefined") || (typeof token == "undefined")) //TODO try request.body.hasOwnProperty('token');
        {
            return response.status(400).json({errors: [{msg: "Missing data"}] });
        }

        // Validate input
        if (validator.isEmpty(title))
        {
            return response.status(400).json({errors: [{msg: "title is required"}] });
        }


        let validateResult = validateToken(token);
        if(validateResult === "invalid")
        {
            return response.status(400).json({errors: [{msg: validateResult}] });
        }



        let user = await User.findById(validateResult.user.id).select("-password");

        //Check if schedule title for this user is already in database
        let foundSchedule = await Schedule.findOne({title: title, user: user.id});
        if (foundSchedule)
        {
            return response.status(400).json({errors: [{msg: "Title already used"}]});
        }




        let newSchedule = new Schedule({title: title, user: user.id});
        await newSchedule.save();


        response.json(newSchedule);
    }
    catch (e)
    {
        console.error(e.message);
        response.status(500).send("Server error");
    }
}