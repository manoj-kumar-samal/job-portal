import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany=async (req,res)=>{
    try{
        const {companyName}=req.body;
        if(!companyName){
            return res.status(400).json({errors:"Company name is required"})
        }
        let company=await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({errors:"You can't register same company"})
        }
        company=await Company.create({name:companyName,userId:req.id})
        return res.status(201).json({message:"Company registered successfully",success:true,company})
    }
    catch(error){
        console.log(error);
        return res.status(400).json({errors:"Error in register company",error})
    }
}

export const getCompany=async (req,res)=>{
    try{
        const userId=req.id;
        const companies=await Company.find({userId});
        if(!companies){
            return res.status(404).json({errors:"Comapnies not found"})
        }
        return res.status(200).json({companies,success:true})
    }
    catch(error){
        console.log(error);
        return res.status(400).json({errors:"Error in get company"})
    }
}

export const getCompanyById=async (req,res)=>{
    try{
        const companyId=req.params.id;
        const company=await Company.findById(companyId);
        if(!company){
            return res.status(400).json({errors:"Company not found"})
        }
        return res.status(200).json({company,success:true})
    }
    catch(error){
        console.log(error);
        return res.status(400).json({errors:"Error in get companies by id"})
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        const updateData = { name, description, website, location };

        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                folder: "company_logos"
            });

            updateData.logo = cloudResponse.secure_url;
            updateData.logoPublicId = cloudResponse.public_id; // optional for future deletion
        }

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(400).json({ errors: 'Company not found' });
        }

        return res.status(200).json({
            message: "Company information updated",
            success: true,
            company
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ errors: "Error in updating company" });
    }
}
