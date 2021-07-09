import ClientModel, { IRegularClient } from "../models/ClientRegular";

class BusinessClient {
    constructor(){

    }

    public async addClients(client: IRegularClient) {
        try {
            let clientDb = new ClientModel(client);
            let result = await clientDb.save();
            return result;
        } catch (err) {
            return err;
        }
    }
    public async readClients(){
        let listClient: Array<IRegularClient> = await ClientModel.find();
        return listClient;
    }
    public async deleteClients(id: string) {
        let result = await ClientModel.remove({ _id: id });
        return result;
    }
    public async updateClients(id: string, client: any) {
        let result = await ClientModel.update({ _id: id }, { $set: client });
        return result;
    }

}
export default BusinessClient;