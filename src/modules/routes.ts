
import { Express } from "express";
import RoutesController from "./clientmodule/routeController/RoutesController";

class Routes {
    private routesController: RoutesController;
    public api: string = "s";
    constructor(app: Express) {
        this.routesController = new RoutesController();
        this.configureRoutes(app);

    }
    private configureRoutes(app: Express){
        app.route(`/mensaje`).get(this.routesController.mensaje);
    }
    
}
export default Routes;