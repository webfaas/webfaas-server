import * as path from "path";
import * as chai from "chai";
import { Server } from "../lib/Server";

describe("CommandData", () => {
    it("convertArgsToCommandData", function(){
        const server = new Server();
        server.configure();
        let command1 = server.convertArgsToCommandData([]);
        chai.expect(command1.config).to.eq("");
        chai.expect(command1.help).to.eq(false);
        chai.expect(command1.plugins).to.eql([]);
    })

    it("convertArgsToCommandData help", function(){
        const server = new Server();
        let command1 = server.convertArgsToCommandData(["help"]);
        chai.expect(command1.config).to.eq("");
        chai.expect(command1.help).to.eq(true);
        chai.expect(command1.plugins).to.eql([]);
    })

    it("convertArgsToCommandData --help", function(){
        const server = new Server();
        let command1 = server.convertArgsToCommandData(["--help"]);
        chai.expect(command1.config).to.eq("");
        chai.expect(command1.help).to.eq(true);
        chai.expect(command1.plugins).to.eql([]);
    })

    it("convertArgsToCommandData --config config1", function(){
        const server = new Server();
        let command1 = server.convertArgsToCommandData(["--config", "config1"]);
        chai.expect(command1.config).to.eq("config1");
        chai.expect(command1.help).to.eq(false);
        chai.expect(command1.plugins).to.eql([]);
    })

    it("convertArgsToCommandData --plugins folder1,folder2,folder3", function(){
        const server = new Server();
        let command1 = server.convertArgsToCommandData(["--plugins", "folder1,folder2,folder3"]);
        chai.expect(command1.config).to.eq("");
        chai.expect(command1.help).to.eq(false);
        chai.expect(command1.plugins).to.eql(["folder1", "folder2", "folder3"]);
    })

    it("convertArgsToCommandData --config config1 --plugins folder1,folder2,folder3", function(){
        const server = new Server();
        let command1 = server.convertArgsToCommandData(["--config", "config1", "--plugins", "folder1,folder2,folder3"]);
        chai.expect(command1.config).to.eq("config1");
        chai.expect(command1.help).to.eq(false);
        chai.expect(command1.plugins).to.eql(["folder1", "folder2", "folder3"]);
    })

    it("convertArgsToCommandData --config config1 --plugins folder1,folder2,folder3 --paramnotexist param1", function(){
        const server = new Server();
        let command1 = server.convertArgsToCommandData(["--config", "config1", "--plugins", "folder1,folder2,folder3", "--paramnotexist", "param1"]);
        chai.expect(command1.config).to.eq("config1");
        chai.expect(command1.help).to.eq(true);
        chai.expect(command1.plugins).to.eql(["folder1", "folder2", "folder3"]);
    })

    it("convertArgsToCommandData --config --plugins", function(){
        const server = new Server();
        let command1 = server.convertArgsToCommandData(["--config", " ", "--plugins", " "]);
        console.log("command1", command1);
        chai.expect(command1.config).to.eq("");
        chai.expect(command1.help).to.eq(false);
        chai.expect(command1.plugins).to.eql([""]);
    })

    it("configureByCommandData - default", function(){
        const server = new Server();
        let command1 = server.convertArgsToCommandData([]);
        server.configure(command1);
    })

    it("configureByCommandData - plugins", function(){
        const server = new Server();
        let command1 = server.convertArgsToCommandData(["--config", "config1", "--plugins", "folder1,folder2,folder3"]);
        server.configure(command1);
    })

    it("configureByCommandData - whitout plugins", function(){
        const server = new Server();
        let command1 = server.convertArgsToCommandData(["--config", "config1"]);
        server.configure(command1);
    })

    it("configureByCommandData - load local module", async function(){
        const server = new Server();
        server.getWebFaas().setPathRootPackageDirectory(path.join(__dirname, "data", "modules", "moduletest1"));
        let command1 = server.convertArgsToCommandData([]);
        server.configure(command1);
        let moduleTest: any = await server.getWebFaas().getCore().import("moduletest1", "1.0.0");
        chai.expect(moduleTest(2,3)).to.eq(5);
    })
})