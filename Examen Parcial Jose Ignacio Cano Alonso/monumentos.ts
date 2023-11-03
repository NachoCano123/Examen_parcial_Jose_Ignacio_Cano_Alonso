import mongoose from "npm:mongoose@7.6.3"
import { monumento } from "./Types.ts"

const Schema = mongoose.Schema

const MonumentoSchema = new Schema ({
    nombre: {type: String, required: true, unique: true},
    descripcion: {type: String, required: true, unique: true},
    codigopostal: {type: Number, required: true},
    codigoISO: {type: String, required: true},
}, {
    timestamps: true, 
})

export type MonumentoMode1Type = mongoose.Document & Omit<monumento, "id">

export const MonumentoMode1Type = mongoose.model<MonumentoMode1Type>(
    "monumentos",
    MonumentoSchema
)