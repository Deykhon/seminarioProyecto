import { Request, response, Response } from "express";




class RoutesController {
    constructor() {

    }
    public mensaje(req: Request, res: Response){
    
        res.status(200).json({ serverResponse: "hola mundo" });
        return;
    }
}
export default RoutesController;