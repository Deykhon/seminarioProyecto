import { Request, response, Response } from "express";
import BusinessUser from "../businessController/BusinessUser";
import BusinessRoles from "../businessController/BusinessRoles";
import sha1 from "sha1";
import { ISimpleUser, IUser } from "../models/Users";
import { IRoles } from "../models/Roles";
import jsonwebtoken from "jsonwebtoken";

interface Icredentials {
    email: string;
    password: string;
}

class RoutesController {
    constructor() {

    }

    public async login(req: Request, res: Response){
        var credentials: Icredentials = req.body;
        if (credentials.email == undefined) {
            res.status(300).json({ serverResponse: "Es necesario el parametro email"});
            return;
        }
        if (credentials.password == undefined) {
            res.status(300).json({ serverResponse: "Es necesario el parametro password"});
            return;
        }
        credentials.password = sha1(credentials.password);
        const user: BusinessUser = new BusinessUser();
        let result: Array<IUser> = await user.readUsers(credentials, 0, 1);
        if (result.length == 1) {
            
            var loginUser: IUser = result[0]
            var token: string = jsonwebtoken.sign(
                { id: loginUser._id, email: loginUser }, "secret"
            );
            res.status(200).json({ 
                serverResponse: { email: loginUser.email, username: loginUser.username, token }});
             return;
        }
        res.status(200).json({ serverResponse: "credenciales incorrectas" });                          
    }
    
    public async createUsers(req: Request, res: Response) {
    
        var user: BusinessUser = new BusinessUser();
        var userData = req.body;
        userData["registerdate"] = new Date();
        userData["password"] = sha1(userData["password"]);
        let result = await user.addUsers(userData);
        res.status(201).json({ serverResponse: result });
    }
    public async getUsers(req: Request, res: Response) {
        var user: BusinessUser = new BusinessUser();
        const result: Array<IUser> = await user.readUsers();
        res.status(200).json({ serverResponse: result });

    }
    public async updateUsers(req: Request, res: Response) {
        var user: BusinessUser = new BusinessUser();
        let id: string = req.params.id;
        var params = req.body;
        var result = await user.updateUsers(id, params);
        res.status(200).json({ serverResponse: result });

    }
    public async removeUsers(req: Request, res: Response) {
        var user: BusinessUser = new BusinessUser();
        let id: string = req.params.id;
        let result = await user.deleteUsers(id);
        res.status(200).json({ serverResponse: result});
    }
    // para añadir un rola un usuario
    public async addRolUser(req: Request, res: Response){
        let idUs: string = req.params.id;
        let idRol = req.body.idRol;
        if (idUs == null && idRol == null) {
            res.status(300).json({ severResponse: "No se definió id de usuario ni id de rol" });
            return;
        }
        var user: BusinessUser = new BusinessUser();
        var result = await user.addRol(idUs, idRol);
        if(result == null){
            res.status(300).json({ serverResponse: "El rol o usuario no existe" });
        }
        res.status(200).json({ serverResponse: result });
    }
    //createRol para crear roles
    public async createRol(req: Request, res: Response) {
        let roles: BusinessRoles = new BusinessRoles();
        var rolesData: any = req.body;
        let result = await roles.createRol(rolesData);
        if(result == null){
            res.status(300).json({ serverResponse: "El rol tiene parametros no válidos"});
            return;
        }
        res.status(201).json({ serverResponse: result });

    }
    // listar todos los roles
    public async listRol(req: Request, res: Response){
        var rol: BusinessRoles = new BusinessRoles();
        const resul: Array<IRoles> = await rol.listarRoles();
        res.status(200).json({ serverResponse: resul });
    }
    public async removeRol(request: Request, response: Response){
        let roles: BusinessRoles = new BusinessRoles();
        let idRol: string = request.params.id;
        // ?id=13; request.query.id
        let result = await roles.deleteRol(idRol);
        response.status(201).json({ serverResponse: result});
    }
    public async removeUserRol(req: Request, res: Response){
        let roles: BusinessUser = new BusinessUser();
        let idUs: string = req.params.id;
        let idRol: string = req.body.idRol;
        let result = await roles.removeRol(idUs, idRol);
        res.status(201).json({ serverResponse: result});
    }
    public async mensaje(req: Request, res: Response) {
        
        let a: number = 12345
        let s: string = sha1("12345");
        res.status(200).json({ serverResponse: s });

    }

}
export default RoutesController;