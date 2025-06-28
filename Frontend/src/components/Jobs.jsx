import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function Jobs() {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filtered = allJobs.filter((job) =>
        [job.title, job.description, job.location]
          .some((text) =>
            text?.toLowerCase().includes(searchedQuery.toLowerCase())
          )
      );
      setFilterJobs(filtered);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 mt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Card */}
          <div className="w-full lg:w-[25%]">
            <FilterCard />
          </div>

          {/* Job Listings */}
          <div className="flex-1 h-[75vh] overflow-auto pb-5">
            {filterJobs.length === 0 ? (
              <span className="text-gray-500">Job not found</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
