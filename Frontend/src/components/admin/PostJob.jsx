import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import axios from 'axios';

import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { JOB_API_END_POINT } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';

function PostJob() {
    const navigate=useNavigate();
    const { companies = [] } = useSelector((store) => store.company || {});
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        location: '',
        salary: '',
        jobType: '',
        experience: '',
        position: '',
        companyId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`${JOB_API_END_POINT}/jobpost`, formData, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials: true,
            });

            if (res.data.success) {
                navigate("/admin/jobs")
                toast.success(res.data.message || 'Job posted successfully!');
                setFormData({
                    title: '',
                    description: '',
                    requirements: '',
                    location: '',
                    salary: '',
                    jobType: '',
                    experience: '',
                    position: '',
                    companyId: '',
                });
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to post job');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-xl mx-auto my-3">
                <h2 className="text-2xl font-bold mb-3">Post a New Job</h2>
                <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-4xl border border-gray-200 shadow-lg rounded-md">
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Job Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label>Requirements</Label>
                            <Textarea
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label>Job Type</Label>
                            <select
                                name="jobType"
                                value={formData.jobType}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded p-2"
                            >
                                <option value="">Select Type</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>

                        <div>
                            <Label>Experience Required</Label>
                            <Input
                                type="text"
                                name="experience"
                                placeholder="e.g., 2 years, 0-1 years"
                                value={formData.experience}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label>Open Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                required
                                min={1}
                            />
                        </div>

                        <div>
                            <Label>Company</Label>
                            <select
                                name="companyId"
                                value={formData.companyId}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded p-2"
                            >
                                <option value="">Select Company</option>
                                {companies.map((company) => (
                                    <option key={company._id} value={company._id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {
                        companies.length > 0 ? (
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Posting...' : 'Post Job'}
                            </Button>
                        ) : (
                            <span className='text-red-600 text-xs font-bold text-center my-3'>*Please register a company first, before posting job</span>
                        )
                    }
                </form>
            </div>
        </div>
    );
}

export default PostJob;
