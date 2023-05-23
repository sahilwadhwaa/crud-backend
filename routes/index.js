import express from "express";
import { delData, getData, saveData, updateData } from "../controller/index.js";

const router= express.Router();

//read
router.get("/student",getData)

//create
router.post("/student",saveData)


//update
router.patch("/student/:id", updateData)

//delete
router.delete("/student/:id",delData)

export default router;

