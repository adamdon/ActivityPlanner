import jsonwebtoken from "jsonwebtoken";

export default function (token)
{
    let validateResult = "invalid";

    if(!token)
    {
        validateResult = "invalid, empty";
        return validateResult;
    }


    //verify token
    try
    {
        let jsonwebtokenSecret = process.env.JWT_SECRET;
        let decodedToken = jsonwebtoken.verify(token, jsonwebtokenSecret);

        validateResult = decodedToken;
        return validateResult
    }
    catch (error)
    {
        //send error response if not valid
        validateResult = ("invalid, " + error.message);
        return validateResult;
    }
}