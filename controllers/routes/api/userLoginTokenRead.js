import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import validator from 'validator';
import bcryptjs from "bcryptjs";
import {User} from "../../../models/User.js";




export default async function (request, response)
{
    let email = request.body.email;
    let password = request.body.password;


    if((typeof email == "undefined") || (typeof password == "undefined"))
    {
        return response.status(400).json({errors: [{msg: "Missing data"}] });
    }


    // Validate input
    if (!validator.isEmail(email))
    {
        return response.status(400).json({errors: [{msg: "Email is required"}] });
    }
    else if (validator.isEmpty(password))
    {
        return response.status(400).json({errors: [{msg: "password is required"}]});
    }

    try
    {

        //Check if user is in database
        let existingUser = await User.findOne({email: email});
        if (!existingUser)
        {
            //Respond with error user is not in database
            let messageText = `Invalid Details - user not found`;
            return response.status(400).json({errors: [{msg: messageText}]});
        } else
        {
            //check password
            // noinspection JSUnresolvedVariable
            let isMatch = await bcryptjs.compare(password, existingUser.password);
            if (!isMatch)
            {
                let messageText = `Invalid Details - password incorrect`;
                return response.status(400).json({errors: [{msg: messageText}]});
            }


            //Return jsonwebtoken
            // noinspection JSUnresolvedVariable
            let jwtPayload = {user: {id: existingUser.id}};
            let jsonwebtokenSecret = process.env.JWT_SECRET;
            let jwtOptions = {expiresIn: 31556952};
            jsonwebtoken.sign(jwtPayload, jsonwebtokenSecret, jwtOptions, (error, token) =>
            {
                if (error) throw error;

                // Log.response(request, ({token}));
                response.json({token})
            });

            //send Successful message
            // response.status(200).send("Successful User Registration");
        } // end of if else

    } catch (e)
    {
        console.error(e.message);
        return response.status(500).json({errors: [{msg: "Server error"}]});
    }

}