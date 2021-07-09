import mongoose, { Schema, Document } from "mongoose";
//import RolesModel, { IRoles } from "./Roles";

export interface ISimpleRegularClient {
    fullname?: string;
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
export interface IRegularClient extends Document {
    fullname: string;
    surname: string;
    telephone: string;
    address: string;
    email: string;
    state: boolean;
    registerdate: Date;
    updateAt?: Date;
    uriavatar?: string;
    pathavatar?: string;
}
const userSchema: Schema = new Schema({
    fullname: { type: String, required: true },
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

export default mongoose.model<IRegularClient>("ClientRegular", userSchema);