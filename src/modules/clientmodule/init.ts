import { Express } from "express";
import Routes from "../routes";
class ClientModule {
    private routes: Routes;
    constructor(app: Express){
        console.log("INIT CLIENT MODULE");
        this.routes = new Routes(app);
    }
}
export default ClientModule;