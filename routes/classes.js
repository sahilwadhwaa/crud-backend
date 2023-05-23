import express from "express";
import { delClass, getClass, saveClass, updateClass } from "../controller/classes.js";

const router= express.Router();

//read
router.get("/class",getClass)

//create
router.post("/class",saveClass)


//update
router.patch("/class/:id", updateClass)

//delete
router.delete("/class/:id",delClass)

export default router;

