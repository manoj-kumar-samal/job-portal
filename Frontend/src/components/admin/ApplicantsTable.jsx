import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import store from '../../redux/store'
import axios from "axios"
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import toast from 'react-hot-toast'

function ApplicantsTable() {
  const shortListingStatus = ["Accepted", "Rejected"]
  const { applicants } = useSelector(store => store.application)

  async function statusHandler(status,id){
    try{
      axios.defaults.withCredentials=true;
      const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{
        withCredentials:true
      });
      console.log(res)
      if(res.data.success){
        toast.success(res.data.message)
      }
    }
    catch(error){
      toast.error(error.response.data.message)
    }
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            applicants && applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phone}</TableCell>
                <TableCell className="text-blue-600 cursor-pointer">
                  {
                    item.applicant?.profile?.resume ?
                    <a href={item?.applicant?.profile?.resume} target='_blank' rel='noopener noreferrer'>{item?.applicant?.profile?.resumeOriginalName}</a> :
                    <span>NA</span>
                  }
                </TableCell>
                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-end cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className='cursor-pointer' />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {
                        shortListingStatus.map((status, index) => {
                          return (
                            <div onClick={()=>statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                              <span>{status}</span>
                            </div>
                          )
                        })
                      }
                    </PopoverContent>
                  </Popover>

                </TableCell>
              </tr>
            ))
          }

        </TableBody>

      </Table>
    </div>
  )
}

export default ApplicantsTable
