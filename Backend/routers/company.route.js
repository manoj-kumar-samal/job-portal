import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";


const router=express.Router();

router.post("/register",isAuthenticated,registerCompany);
router.get("/companies",isAuthenticated,getCompany);
router.get("/company/:id",isAuthenticated,getCompanyById)
router.put("/update/:id",upload.single("file"),isAuthenticated,updateCompany)


export default router;