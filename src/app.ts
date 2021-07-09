import express, { Express } from "express";
import * as bodyParser from "body-parser";
import mongoose, { Mongoose } from "mongoose";
import UserModules from "./modules/usermodule/init";
import ClientModule from "./modules/clientmodule/init";

class App {

    public app: Express = express();
    public mongooseClient: Mongoose;

    constructor(){
        this.configurations();
        this.connectDatabase();
        this.initApp();
    }

    public configurations(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    public connectDatabase(){
        let host: string = "mongodb://172.21.0.2";
        let dataBase: string = process.env.DATABASE || "casaReal";
        let connectionString: string = `${host}/${dataBase}`;
        mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        mongoose.connection.on("error", (err) => {
            console.log("ERROR DE CONECCION A LA DB");
            console.log(err);
        });
        mongoose.connection.on("open", () => {
            console.log("BATABASE CONNECTION SUCCESS");
        });
        this.mongooseClient = mongoose;

    }
    public initApp(){
        console.log("CARGANDO MODULOS");
        const userModules = new UserModules(this.app);
        const clientModules = new ClientModule(this.app);
    }
}
export default new App();