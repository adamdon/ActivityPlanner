import mongoose from "mongoose";
// import config from "../config/default";
// import config from '../config/default.js'





// let mongoURI = config.get("mongoURI");
// let mongoURI = config.mongoURI;



export class database
{
    constructor() {    }

    static async connect()
    {
        try
        {
            console.log("#MongoDB | Connecting...")

            mongoose.set('useNewUrlParser', true);
            mongoose.set('useUnifiedTopology', true);
            mongoose.set('useCreateIndex', true);
            mongoose.set('useFindAndModify', false);
            await mongoose.connect(mongoURI, null, null );

            console.log("#MongoDB | ...Connected")
        }
        catch (error)
        {
            console.error(error.message);
            process.exit(1);  //exit run and fail
        }
    }
    
}

