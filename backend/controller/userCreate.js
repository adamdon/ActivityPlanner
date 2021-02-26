import mongoose from "mongoose";
import gravatar from "gravatar";
import jsonwebtoken from "jsonwebtoken";
import {check, validationResult} from "express-validator";
import bcryptjs from "bcryptjs";

import {User} from "../model/User.js";





export default async function (request, response)
{
    let {name, email, password} = request.body;


    check("name", "Name is required").not().isEmpty();
    check("email", "Email is required").isEmail();
    check("password", "Password must be 6 or more character").isLength({min: 6});


    try
    {
        //validate request inputs
        let errors = validationResult(request);
        if (!errors.isEmpty())
        {
            //if checkHandlers result in a not empty "errors", return said errors
            return response.status(400).json({errors: errors.array()});
        }


        //Check if user is already in database
        let existingUser = await User.findOne({email: email});
        if (existingUser)
        {
            //Respond with error that user already exists
            let messageText = `Email: ${email} is already registered`;
            return response.status(400).json({errors: [{msg: messageText}]});
        } else
        {
            //Get email's Gravatar
            let avatar = gravatar.url(email, {s: "200", r: "pg", d: "mm"});


            //Encrypt and get passwordHashed
            let passwordSalt = await bcryptjs.genSalt(10);
            let passwordHashed = await bcryptjs.hash(password, passwordSalt);


            //Create and save new user to the database
            let newUser = new User({name: name, email: email, avatar: avatar, password: passwordHashed});
            await newUser.save();

            //Return jsonwebtoken
            let jwtPayload = {user: {id: newUser.id}};
            let jsonwebtokenSecret = process.env.JWT_SECRET;
            let jwtOptions = {expiresIn: 360000};
            jsonwebtoken.sign(jwtPayload, jsonwebtokenSecret, jwtOptions, (error, token) =>
            {
                if (error) throw error;

                //send Successful message
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