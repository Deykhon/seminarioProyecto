
import { Express } from "express";
import RoutesController from "./usermodule/routeController/RoutesController";
import RoutesControllerC from "./clientmodule/routeController/RoutesControllerC";

class Routes {
    private routesController: RoutesController;
    private routesControllerC: RoutesControllerC;

    constructor(app: Express) {
        this.routesControllerC = new RoutesControllerC();
        this.routesController = new RoutesController();
        this.configureRoutes(app);

    }
    private configureRoutes(app: Express){
        const api: string = "api";
        //-------------------------USERS ROUTES---------------
        app.route(`/${api}/mensaje`).get(this.routesController.mensaje);
        app.route(`/${api}/login`).post(this.routesController.login);
        app.route(`/${api}/users`).post(this.routesController.createUsers);
        app.route(`/${api}/users`).get(this.routesController.getUsers);
        app.route(`/${api}/users/:id`).delete(this.routesController.removeUsers);
        app.route(`/${api}/users/:id`).put(this.routesController.updateUsers);

        app.route(`/${api}/addrol/:id`).put(this.routesController.addRolUser);

        //-----------------------------ROLES ROUTES------------------------
        app.route(`/${api}/roles`).post(this.routesController.createRol);
        app.route(`/${api}/roles`).get(this.routesController.listRol);
        app.route(`/${api}/roles`).delete(this.routesController.removeRol);

        //------------------------CLIENTS ROUTES----------------------
        app.route(`/${api}/clients`).post(this.routesControllerC.createClients);
        app.route(`/${api}/clients`).get(this.routesControllerC.getClients);
        app.route(`/${api}/clients/:id`).delete(this.routesControllerC.removeClients);
        app.route(`/${api}/clients/:id`).put(this.routesControllerC.updateClients);
    }

    
}
export default Routes;