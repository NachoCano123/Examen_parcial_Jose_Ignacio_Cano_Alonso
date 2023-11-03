//@ts-ignore
import express, {Request, Response} from "npm:express@4.18.2"
import { MonumentoMode1Type } from "./monumentos.ts"
import { monumento } from "./Types.ts"
import mongoose from "npm:mongoose@7.6.3"

export const crearmonumento = async(req: Request, res:Response) => {
    try
    {
    const {nombre, descripcion, codigopostal, codigoISO} = req.body //El req.bosy

    if(!nombre || !descripcion || !codigopostal || !codigoISO){
        res.status(500).send("Faltan datos")
        return
    }

    if(typeof nombre !== "string" || typeof descripcion !== "string" || typeof codigopostal !== "number" || typeof codigoISO !== "string")
    {
        res.status(500).send("Tipo de dato invalido")
        return
    }

    const exists = await MonumentoMode1Type.findOne({nombre}).exec()
    const existspostal = await MonumentoMode1Type.findOne({codigopostal}).exec()
    if(exists && existspostal){
        res.status(400).send("Ya existe ese nombre con ese codigo postal")
        return
    }

    const char = await MonumentoMode1Type.create({
        nombre,
        descripcion,
        codigopostal,
        codigoISO,
    })

    res.send({
        nombre,
        descripcion,
        codigopostal,
        codigoISO,
        id: char.id,
    })
}
catch(e)
{
    res.status(500).send(e)
}
}

export const mostrarmonumentos = async(req: Request, res:Response) => {
    try {
        const monumentos = await MonumentoMode1Type.find().exec();
        res.send(JSON.stringify(monumentos));
    } catch (e) {
        res.status(500).send(e)
    }
}

export const mostrarmonumentoID = async(req: Request, res:Response) => {
    try{
        const id = new mongoose.Types.ObjectId(req.params.ID) //ID del monumento
        const resultado = await MonumentoMode1Type.findById(id).exec()

        res.send(JSON.stringify(resultado));
    } catch (e)
    {
        res.status(500).send(e)
    }
}

export const actualizar_monumento_por_id = async(req: Request, res:Response) => {
    try{
        const id = new mongoose.Types.ObjectId(req.params.ID) //ID del monumento
        const resultado = await MonumentoMode1Type.find({ID: id}).exec()

        const {nombre, descripcion, codigopostal, codigoISO} = req.body

        if(!resultado)
        {
            res.status(400).send("Ese id no existe")
            return
        }

        await MonumentoMode1Type.findOneAndUpdate({ID: id},{
            nombre: nombre,
            descripcion: descripcion,
            codigopostal: codigopostal,
            codigoISO: codigoISO,
        })

        res.send({
            nombre,
            descripcion,
            codigopostal,
            codigoISO,
        })
    } catch (e)
    {
        res.status(500).send(e)
    }
}

export const borrar_monumento_por_id = async(req: Request, res:Response) => {
    try {
        const id = req.params.ID //ID del monumento
        //const resultado = await MonumentoMode1Type.find({ID: id}).exec()

        const exists = await MonumentoMode1Type.find({ID: id}).exec()
        if(!exists)
        {
            res.status(400).send("Ese id no existe")
            return
        }

        res.status(200).send(exists)

        await MonumentoMode1Type.findOneAndDelete({ID: id}).exec()
        //res.send(JSON.stringify(exists));
    } catch (e) {
        res.status(500).send(e)   
    }
}