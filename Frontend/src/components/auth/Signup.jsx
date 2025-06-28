import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/authSlice';
import store from '../../redux/store';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user,loading } = useSelector(store => store.auth)
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
        password: '',
        role: 'student',
        profile: null,
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleRoleChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            role: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            profile: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('fullname', formData.fullname);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('password', formData.password);
        data.append('role', formData.role);
        if (formData.profile) {
            data.append('profile', formData.profile);
        }

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/signup`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            navigate("/login")
            toast.success(res.data.message);
            // if (res.data.success) {

            // }

            //   console.log('Signup Successful:', res.data);
            // Optionally redirect user or show success message here
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.errors);
        }
        finally {
            dispatch(setLoading(false))
        }
    };
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div className="max-w-md mx-auto mt-2 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="fullname">Full Name</Label>
                        <Input
                            id="fullname"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label>Select Role</Label>
                            <RadioGroup value={formData.role} onValueChange={handleRoleChange}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="student" id="student-role" />
                                    <Label htmlFor="student-role">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2 mt-2">
                                    <RadioGroupItem value="admin" id="admin-role" />
                                    <Label htmlFor="admin-role">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div>
                            <Label htmlFor="profile">Profile Picture</Label>
                            <Input
                                id="profile"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {formData.profile && (
                                <img
                                    src={URL.createObjectURL(formData.profile)}
                                    alt="Preview"
                                    className="mt-2 h-16 w-16 object-cover rounded-full"
                                />
                            )}
                        </div>
                    </div>

                    {
                        loading ? <Button className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"><Loader2 className='animate-spin' /></Button> :
                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Sign Up
                            </button>
                    }
                    <div className="text-sm text-center">
                        <span>Already have an account? </span>
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
