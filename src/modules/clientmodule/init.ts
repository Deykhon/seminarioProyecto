import { Express } from "express";
import Routes from "../../modules/routes";
class clientmodule {
    private routes: Routes;
    constructor(app: Express) {
        console.log("INIT CLIENT MODULE");
        this.routes = new Routes(app);
    }
}
export default clientmodule;