import config from "config";
import mongoose from "mongoose";
import log from "./logger";

async function connect() {
    const dbUri = config.get<string>("dbUri")

    try{
        await mongoose.connect(dbUri);
        log.info("DB connected");
    }  catch (error) {
        log.error("could not connet to db");
        process.exit(1);
    }
    
}

export default connect;