import express from "npm:express@4.18.2"
import mongoose from "npm:mongoose@7.6.3"

import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts"
import { actualizar_monumento_por_id, borrar_monumento_por_id, crearmonumento, mostrarmonumentoID, mostrarmonumentos } from "./OperacionesMonumentos.ts";

const env= await load();

const MONGO_URL= env.MONGO_URL || Deno.env.get("MONGO_URL");

const PORT= env.PORT || Deno.env.get("PORT") || 3100

if (!MONGO_URL) {
  console.log("No url valida de mongo");
  Deno.exit(1);
}

try {
  await mongoose.connect(MONGO_URL);
  console.log("Conectado con exito a la base de datos")

  const app=express();
  app.use(express.json());

  //Mostrar todos los monumentos
  app.get("/api/monumentos", mostrarmonumentos)

  //Mostrar monumento por su Id
  app.get("/api/monumentos/:id", mostrarmonumentoID)

  //Crear monumento
  app.post("/api/monumentos", crearmonumento)

  //Actualizar monumento
  app.put("/api/monumentos/:id", actualizar_monumento_por_id)

  //Borrar monumento
  app.delete("/api/monumentos/:id", borrar_monumento_por_id)

  app.listen(PORT, ()=> {
    console.log("Escuchando por el puerto " + PORT);
  })

} catch (e) {
  console.error(e);
}