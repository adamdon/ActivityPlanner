import {User} from "../../../models/User.js";
import validateToken from "../../utilities/validateToken.js";




export default async function (request, response)
{
    try
    {
        let validateResult = validateToken(request.body.token);
        if(validateResult === "invalid")
        {
            return response.status(400).json({errors: [{msg: validateResult}] });
        }


        let user = await User.findById(validateResult.user.id).select("-password");
        response.json(user);

    } catch (error)
    {
        console.error(error.message);
        response.status(500).send("Server error");
    }
}