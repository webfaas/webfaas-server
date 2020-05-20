#!/usr/bin/env node

import { Server } from "../lib/Server";

const server = new Server();

(async function(){
    const commandData = server.convertArgsToCommandData(process.argv.slice(2));
    server.configure(commandData);
    
    try {
        await server.start();
        console.log("Server started!");
    }
    catch (errTry) {
        console.error("Err: ", errTry);
        process.exit(1);
    }
})();

process.on("SIGTERM", async () => {
    console.log("Server shutdown...");
    await server.stop();
    console.log("Server stoped");
});