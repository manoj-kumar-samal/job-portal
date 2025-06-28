import express from "express";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router=express.Router();

router.post("/jobpost",isAuthenticated,postJob)
router.get("/getalljobs",isAuthenticated,getAllJobs)
router.get("/getJob/:id",isAuthenticated,getJobById)
router.get("/getadminjobs",isAuthenticated,getAdminJobs)


export default router;