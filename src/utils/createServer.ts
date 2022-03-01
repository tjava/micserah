import express from "express";
import routes from "../routes";
import deserializeUser from "../middleware/deserializeUser";

function  createServer() {
    
    const server = express();

    server.use(express.json());

    server.use(deserializeUser);

    routes(server);

    return server;
}

export default createServer;