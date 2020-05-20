"use strict";

import { Server } from "../lib/Server";

const server = new Server();

(async function(){
    try {
        server.configure();
        await server.start();

        console.log("Server started!");
    }
    catch (errTry) {
        console.log("errExample: ", errTry);
    }
})();