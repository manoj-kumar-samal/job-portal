import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Contact, Mail, Pen } from 'lucide-react';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';

function Profile() {
  useGetAppliedJobs();
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 space-y-6">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt="Profile"
                />
              </Avatar>
              <div className="text-center sm:text-left">
                <h1 className="font-semibold text-lg sm:text-xl">{user?.fullname}</h1>
                <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
              </div>
            </div>
            <div className="sm:self-start">
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-1 w-full sm:w-auto"
              >
                <Pen className="w-4 h-4" />
                Edit
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 break-all">
              <Mail className="w-4 h-4 text-gray-600" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Contact className="w-4 h-4 text-gray-600" />
              <span>{user?.phone}</span>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="font-semibold text-md mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length ? (
                user.profile.skills.map((skill, idx) => (
                  <Badge key={idx}>{skill}</Badge>
                ))
              ) : (
                <span className="text-sm text-gray-500">NA</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="space-y-1">
            <Label className="font-semibold text-md">Resume</Label>
            {user?.profile?.resume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm break-all"
              >
                {user.profile.resumeOriginalName || 'View Resume'}
              </a>
            ) : (
              <span className="text-sm text-gray-500">NA</span>
            )}
          </div>

          {/* Applied Jobs */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-3">Applied Jobs</h2>
            <AppliedJobTable />
          </div>
        </div>

        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default Profile;
