import express from "express";
import { login, logout, signup, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router=express.Router();

router.post('/signup', upload.single('profile'), signup);
router.post("/login",login);
router.get("/logout",logout)
router.post("/profile/update", upload.single("resume"), isAuthenticated, updateProfile);



export default router;