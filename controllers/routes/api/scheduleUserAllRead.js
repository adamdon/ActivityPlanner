import {User} from "../../../models/User.js";
import {Schedule} from "../../../models/Schedule.js";
import validateToken from "../../utilities/validateToken.js";




export default async function (request, response)
{
    try
    {
        let requestToken = request.body.token;

        if(typeof requestToken == "undefined")
        {
            return response.status(400).json({errors: [{msg: "Missing data"}] });
        }

        let validateResult = validateToken(requestToken);
        if(validateResult === "invalid")
        {
            return response.status(400).json({errors: [{msg: validateResult}] });
        }


        let user = await User.findById(validateResult.user.id).select("-password");


        const posts = await Schedule.find({user: user.id}).sort({date: -1});
        response.json(posts);

    } catch (error)
    {
        console.error(error.message);
        response.status(500).send("Server error");
    }
}