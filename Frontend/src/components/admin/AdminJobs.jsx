import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '../../redux/jobSlice';

function AdminJobs() {
  useGetAllAdminJobs();
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 my-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 my-5">
          <Input
            onChange={(e) => setInput(e.target.value)}
            className="w-full sm:max-w-sm"
            placeholder="Filter by name, role"
          />
          <Button
            onClick={() => navigate('/admin/job/create')}
            className="w-full sm:w-auto"
          >
            New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
}

export default AdminJobs;
