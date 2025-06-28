import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../redux/companySlice';

function Companies() {
  useGetAllCompanies();
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 my-10">
        {/* Filter + Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 my-5">
          <Input
            onChange={(e) => setInput(e.target.value)}
            className="w-full sm:max-w-xs"
            placeholder="Filter by name"
          />
          <Button
            onClick={() => navigate('/admin/company/create')}
            className="w-full sm:w-auto"
          >
            New Company
          </Button>
        </div>

        {/* Table */}
        <CompaniesTable />
      </div>
    </div>
  );
}

export default Companies;
