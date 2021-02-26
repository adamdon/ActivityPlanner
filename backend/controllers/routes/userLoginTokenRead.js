import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import {check, validationResult} from "express-validator";
import bcryptjs from "bcryptjs";
import {User} from "../../models/User.js";




export default async function (request, response)
{
    let {email, password} = request.body;

    check("email", "Registered Email is required for login").isEmail();
    check("password", "Password is required").exists();

    try
    {
        //validate request inputs
        let errors = validationResult(request);
        if (!errors.isEmpty())
        {
            //if checkHandlers result in a not empty "errors", return said errors
            return response.status(400).json({errors: errors.array()});
        }

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
            let jwtOptions = {expiresIn: 360000};
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
        response.status(500).send("Server error");
    }

}