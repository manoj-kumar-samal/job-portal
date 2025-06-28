import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Link, useNavigate } from 'react-router-dom'

function Job({ job }) {
    const navigate = useNavigate();



    function daysAgo(mongodbTime) {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 h-80 flex flex-col justify-between">

            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {daysAgo(job?.createdAt) === 0 ? 'Today' : `${daysAgo(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className="flex items-center gap-2 my-2">
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage className="" src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <div className="line-clamp-2 text-sm text-gray-600 overflow-hidden">
                    {job?.description}
                </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
                <Badge className="text-blue-700" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-[#F83002]" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#7209b7]" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>

            <div className="flex items-center gap-4 mt-4">
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">
                    Details
                </Button>
                <Button className="bg-[#7209b7]">Save for Later</Button>
            </div>
        </div>

    )
}

export default Job
