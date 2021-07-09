import mongoose, { Schema, Document } from "mongoose";
//import RolesModel, { IRoles } from "./Roles";

export interface ISimplePotencialClient {
    name?: string;
    surname?: string;
    telephone?: string;
    address?: string;
    email?: string;
    state?: boolean;
    registerdate?: Date;
    updateAt?: Date;
    uriavatar?: string;
    pathavatar?: string;
}
export interface IPotencialClient extends Document {
    name: string;
    surname: string;
    telephone: string;
    address: string;
    email: string;
    state: boolean;
    registerdate: Date;
    updateAt?: Date;
    uriavatar: string;
    pathavatar: string;
}
const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    telephone: { type: String, unique: true },
    address: { type: String },
    email: { type: String, required: true, unique: true },
    state: { type: Boolean },
    registerdate: { type: Date, required: true },//default: Date.now
    updateAt: { type: Date },
    uriavatar: { type: String },
    pathavatar: { type: String },
});

export default mongoose.model<IPotencialClient>("ClientPotencial", userSchema);