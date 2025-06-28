import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import useGetCompanyById from '../../hooks/useGetCompanyById'

function CompanySetup() {
    const params = useParams();
    useGetCompanyById(params.id)
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })
    const { singleCompany } = useSelector(store => store.company)
    const [loading, setLoading] = useState(false)
    function handleChange(e) {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    function handleChangeFile(e) {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }
    async function handleSubmit(e) {
        setLoading(true)
        e.preventDefault();
        console.log(input);
        const formData = new FormData();
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("website", input.website)
        formData.append("location", input.location)

        if (input.file) {
            formData.append("file", input.file)
        }

        try {
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies")
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.errors)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || ""
        })
    }, [singleCompany])


    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={handleSubmit}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button
                            type="button"
                            onClick={() => navigate("/admin/companies")}
                            variant="outline"
                            className="flex items-center gap-2 text-gray-500 font-semibold"
                        >
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>

                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input type="text" value={input.name} onChange={handleChange} name="name" />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type="text" value={input.description} onChange={handleChange} name="description" />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input type="text" value={input.website} onChange={handleChange} name="website" />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type="text" value={input.location} onChange={handleChange} name="location" />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input type="file" accept="image/*" onChange={handleChangeFile} />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait</Button> :
                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Update
                            </button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanySetup
