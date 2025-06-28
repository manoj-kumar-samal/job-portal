import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { setUser } from '../redux/authSlice';
import toast from 'react-hot-toast';
import store from '../redux/store';

function UpdateProfileDialog({ open, setOpen }) {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();


    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phone: user?.phone || '',
        bio: user?.profile?.bio || '',
        skills: user?.skills?.join(', ') || '',
        file: null,
    });

    function handleChange(e) {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    function fileChangeHandler(e) {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phone', input.phone);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills); // comma-separated string
        if (input.file) {
            formData.append('resume', input.file);
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            console.log(res.data.message)
            if (res.data.message) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Something went wrong.');
        } finally {
            console.log(input)
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent
                    className="sm:max-w-[425px]"
                    onInteractOutside={() => setOpen(false)}
                >
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                        <DialogDescription>
                            You can update your personal information and upload your latest resume here.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="fullname" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    type="text"
                                    onChange={handleChange}
                                    value={input.fullname}
                                    id="fullname"
                                    className="col-span-3"
                                    name="fullname"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    type="email"
                                    onChange={handleChange}
                                    value={input.email}
                                    id="email"
                                    className="col-span-3"
                                    name="email"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">
                                    Phone
                                </Label>
                                <Input
                                    type="number"
                                    onChange={handleChange}
                                    value={input.phone}
                                    id="phone"
                                    className="col-span-3"
                                    name="phone"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio" className="text-right">
                                    Bio
                                </Label>
                                <Textarea
                                    onChange={handleChange}
                                    value={input.bio}
                                    id="bio"
                                    className="col-span-3"
                                    name="bio"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills" className="text-right">
                                    Skills
                                </Label>
                                <Input
                                    onChange={handleChange}
                                    value={input.skills}
                                    id="skills"
                                    className="col-span-3"
                                    name="skills"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file" className="text-right">
                                    Resume
                                </Label>
                                <Input
                                    onChange={fileChangeHandler}
                                    id="file"
                                    type="file"
                                    accept="application/pdf"
                                    className="col-span-3"
                                    name="file"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {loading ? (
                                <Button className="w-full bg-blue-600 text-white py-2 hover:bg-blue-700 transition" disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                                </Button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Update
                                </button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default UpdateProfileDialog;
