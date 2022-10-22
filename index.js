import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; 
import {createServer} from "http";
import {excelRouter} from "./app/excel/router.js";
const app = express();

const port = 3000;

app.use(cors());
/* Parsing body content */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

/* Requests console */

app.use("/api/excel",excelRouter)
app.use((req,res)=>{
    return res.status(404).send("Invalid Request")
})
