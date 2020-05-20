import * as chai from "chai";
import { Server } from "../lib/Server";

describe("convertArgsToCommandData", () => {
    const server = new Server();
    
    it("getWebFaas", function(){
        chai.expect(typeof(server.getWebFaas())).to.eq("object");
    })

    it("start", async function(){
        await server.start();
        //chai.expect(server.getWebFaas().getStarted()).to.eq(true);
    })

    it("stop", async function(){
        await server.stop();
        //chai.expect(faas.getStarted()).to.eq(false);
    })

    it("printHelp", function(){
        server.printHelp();
    })
})