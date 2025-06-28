import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/authSlice';
import store from '../../redux/store';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'student',
    });

    const {user,loading } = useSelector(store => store.auth)

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleRoleChange = (value) => {
        setFormData(prev => ({
            ...prev,
            role: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login Form Submitted:', formData);
        const data = new FormData();
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("role", formData.role);

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            dispatch(setUser(res.data.user))
            navigate("/")
            toast.success(res.data.message);
        }

        catch (error) {
            console.error('Signup Error:', error.response?.data || error.message);
            toast.error(error.response.data.errors);
        }
        finally {
            dispatch(setLoading(false))
        }
    };

    useEffect(()=>{
        if(user){
            navigate("/")
        }
    },[])

    return (
        <div>
            <Navbar />
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Log In to Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <Label>Select Role</Label>
                        <RadioGroup value={formData.role} onValueChange={handleRoleChange}>
                            <div className="flex items-center space-x-2 mb-2">
                                <RadioGroupItem value="student" id="student-role" />
                                <Label htmlFor="student-role">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="recruiter" id="recruiter-role" />
                                <Label htmlFor="recruiter-role">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {
                        loading ? <Button className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait</Button> :
                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Log In
                            </button>
                    }

                    <div className="text-sm text-center">
                        <span>Don't have an account? </span>
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </div>

                    {/* Optional placeholder */}
                    {/* <div className="text-right text-sm text-blue-500 hover:underline">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div> */}
                </form>
            </div>
        </div>
    );
}

export default Login;
