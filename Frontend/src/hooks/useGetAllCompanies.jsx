import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constant";
import {setCompanies} from "../redux/companySlice"


const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/companies`,{withCredentials:true});
                console.log('called');
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[])
}

export default useGetAllCompanies