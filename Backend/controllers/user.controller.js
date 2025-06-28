import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const signup = async (req, res) => {
    const { fullname, email, phone, password, role } = req.body;
    try {

        const file=req.file;
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content)

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists", success: false })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            phone,
            password: hashPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        })
        res.status(201).json({ message: "Signup successfull", newUser })
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ errors: "Error in signup", error })
    }
}

export const login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: "Invalid Credential" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ errors: "Invalid Credential" });
        }

        if (role != user.role) {
            return res
                .status(400)
                .json({ message: "Account doesn't exist with current role" });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile,
        };

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 86400000,
                httpOnly: true,
                sameSite: "lax",  // ✅ LAX allows navigation-based sending
                secure: false     // ✅ only true in production with HTTPS
            })

            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                token,
            });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ errors: "Error in login", error });
    }
};


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "Logged out successfully" })
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ errors: "Error in login login", error })
    }
}

export const updateProfile = async (req, res) => {
    const { fullname, email, phone, bio, skills } = req.body;

    try {
        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // ✅ Add check to avoid calling getDataUri with undefined
        if (req.file) {
            console.log("✅ File received:", req.file); // debugging

            const fileUri = getDataUri(req.file); // req.file.buffer must exist
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "raw",  // ✅ needed for PDFs
                folder: "resumes"
            });

            user.profile.resume = cloudResponse.secure_url;  // ✅ public URL
            user.profile.resumeOriginalName = req.file.originalname;

        } else {
            console.log("⚠️ No file uploaded"); // debugging
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skills.split(',');

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        console.error("❌ Update Profile Error:", error);
        return res.status(500).json({
            error: "Failed to update profile",
            details: error.message,
        });
    }
};


