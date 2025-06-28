import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <Table className="min-w-full text-sm">
          <TableCaption>A list of your applied jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Date</TableHead>
              <TableHead className="whitespace-nowrap">Job Role</TableHead>
              <TableHead className="whitespace-nowrap">Company</TableHead>
              <TableHead className="text-right whitespace-nowrap">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.length <= 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  You haven't applied to any job yet.
                </TableCell>
              </TableRow>
            ) : (
              allAppliedJobs.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="whitespace-nowrap">
                    {item?.createdAt?.split('T')[0]}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {item?.job?.title}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {item?.job?.company?.name}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <Badge
                      className={`${
                        item?.status === 'rejected'
                          ? 'bg-red-400'
                          : item.status === 'pending'
                          ? 'bg-gray-400'
                          : 'bg-green-400'
                      }`}
                    >
                      {item?.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AppliedJobTable;
