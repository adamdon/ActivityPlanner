import mongoose from "mongoose";
import gravatar from "gravatar";
import jsonwebtoken from "jsonwebtoken";
import validator from 'validator';

import bcryptjs from "bcryptjs";

import {User} from "../../../models/User.js";
import {Calendar} from "../../../models/Calendar.js";






export default async function (request, response)
{
  try
    {
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;


        if((typeof name == "undefined") || (typeof email == "undefined") || (typeof password == "undefined"))
        {
            return response.status(400).json({errors: [{msg: "Missing data"}] });
        }


        // Validate input
        if (validator.isEmpty(name))
        {
            return response.status(400).json({errors: [{msg: "Name is required"}] });
        }
        else if (!validator.isEmail(email))
        {
            return response.status(400).json({errors: [{msg: "Email not valid"}] });
        }
        else if (!validator.isLength(password, {min: 6, max: 50}))
        {
            return response.status(400).json({errors: [{msg: "Password must be 6 to 50 characters"}] });
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

            //Create and save new Calendar to the database
            let newCalendar = new Calendar({user: newUser._id});
            await newCalendar.save();

            //Return jsonwebtoken
            let jwtPayload = {user: {id: newUser.id}};
            let jsonwebtokenSecret = process.env.JWT_SECRET;
            let jwtOptions = {expiresIn: 31556952};
            jsonwebtoken.sign(jwtPayload, jsonwebtokenSecret, jwtOptions, (error, token) =>
            {
                if (error) throw error;

                //send Successful message
                response.json({token})
            });

            //send Successful message
            // response.status(200).send("Successful User Registration");
        } // end of if else

    }
    catch (e)
    {
        console.error(e.message);
        return response.status(500).json({errors: [{msg: "Server error"}]});
    }
}