import * as path from "path";
import { WebFaaS, Core } from "@webfaas/webfaas";
import { IWebFaaSCommandData } from "./IWebFaaSCommandData";


export class Server {
    faas: WebFaaS;

    constructor(){
        this.faas = new WebFaaS();
    }
    
    /**
     * return WebFaaS
     */
    getWebFaas(): WebFaaS{
        return this.faas;
    }

    /**
     * start
     */
    async start(){
        await this.getWebFaas().start();
    }

    /**
     * stop
     */
    async stop(){
        await this.getWebFaas().stop();
    }

    /**
     * convert args to command data
     * @param args 
     */
    convertArgsToCommandData(args: string[]): IWebFaaSCommandData{
        var commandParameter = {} as IWebFaaSCommandData;

        commandParameter.help = false;
        commandParameter.config = "";
        commandParameter.plugins = [];

        for (let i = 0; i < args.length; i++){
            let parameterName = args[i];
            if (parameterName.substring(0,2) === "--"){
                parameterName = parameterName.substring(2);
                switch (parameterName){
                    case "help":
                        commandParameter.help = true;
                        break;
                    case "config":
                        commandParameter.config = args[i + 1].trim();
                        i ++;
                        break;
                    case "plugins":
                        commandParameter.plugins = args[i + 1].trim().split(",");
                        i ++;
                        break;
                    default:
                        commandParameter.help = true;
                }
            }
            else{
                commandParameter.help = true;
            }
        }

        return commandParameter;
    }

    /**
     * print help
     */
    printHelp(){
        console.log("Usage:");
        console.log("  webfaas --help");
        console.log("  webfaas --config [path]");
        console.log("  webfaas --config [path] --plugins [path, ...]");
    }

    /**
     * configure WebFaaS
     * @param parameter 
     */
    configure(commandData?: IWebFaaSCommandData){
        if (commandData){
            if (commandData.config){
                this.getWebFaas().setPathConfigFile(commandData.config);
            }
    
            for (let i = 0; i < commandData.plugins.length; i++){
                let folderPlugin = commandData.plugins[i];
                this.getWebFaas().loadPluginsByFolder(folderPlugin);
            }
        }

        this.getWebFaas().scanAndLoadPlugins();

        let rootPackageDirectory = this.getWebFaas().getPathRootPackageDirectory();
        
        if (rootPackageDirectory && (rootPackageDirectory.substr(-15) !== (path.sep + "webfaas-server"))){ //ignore /webfaas-server module
            this.getWebFaas().getCore().getModuleManager().getModuleManagerCache().addLocalDiskModuleToCache(rootPackageDirectory);
        }
    }
}