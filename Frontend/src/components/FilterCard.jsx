import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';


function FilterCard() {
    const filterData = [
        {
            filterType: "Location",
            array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
        },
        {
            filterType: "Industry",
            array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"]
        },
        {
            filterType: "Salary",
            array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
        }
    ]
    const [selectedValue,setSelectedValue]=useState("");
    const dispatch=useDispatch();

    function handleChange(value){
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue))
    },[selectedValue])
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={handleChange}>
                {
                    filterData.map((items, index) => (
    <div key={index}>
        <h1 className='font-bold text-lg'>{items.filterType}</h1>
        {
            items.array.map((item, idx) => {
                const itemId = `r${index}-${idx}`;
                return (
                    <div key={itemId} className='flex items-center space-x-2 my-2'>
                        <RadioGroupItem id={itemId} value={item} />
                        <Label htmlFor={itemId}>{item}</Label>
                    </div>
                );
            })
        }
    </div>
))

                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
