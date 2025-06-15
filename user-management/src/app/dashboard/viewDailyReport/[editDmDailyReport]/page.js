'use client';
import Dashboard from '@/components/Dashboard'
import API_LINKS from '@/config/apiLinks';
import { getTokenData } from '@/utils/getTokenData';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';


const editDmDailyReport = () => {
    const router = useRouter();

    const [totalCalls, setCalls] = useState('');
    const [totalCoursesBought, setBought] = useState("");
    const [totalInterested, setInterested] = useState('');
    const [remarks, setRemarks] = useState('');
    const [userRole, setUserRole] = useState(null);

    const params = useParams()

    useEffect(() => {

        const tokenData = getTokenData();
        if (!tokenData || (tokenData.data.roleName !== 'DIGITAL MARKETER' && tokenData.data.roleName !== 'ADMIN')) {
            router.push('/login');
            return;
        }

        if (tokenData) {
            setUserRole(tokenData.data);
        }
        const fetchData = async () => {
            // const res0 = await axios.get(API_LINKS.UPDATE_DM_REPORT(params.editDmDailyReport), { withCredentials: true })
            const res0 = await axios.get(API_LINKS.GET_DM_REPORT_BY_ID(params.editDmDailyReport), { withCredentials: true })

            setCalls(res0.data.totalCalls);
            setBought(res0.data.totalCoursesBought);
            setInterested(res0.data.totalInterested);
            setRemarks(res0.data.remarks);

        }

        fetchData()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(API_LINKS.UPDATE_DM_REPORT(params.editDmDailyReport), { totalCalls, totalCoursesBought, totalInterested, remarks }, { withCredentials: true })


            // to initial conditions
            setCalls('');
            setBought("");
            setInterested("");
            setRemarks("");


            toast.success("Successfully added report", { autoClose: 1000 })
            router.push("/dashboard/viewDailyReport")
        } catch (error) {
            toast.error("Error occurred", { autoClose: 2000 })
            console.log(error);

        }
    }


    useEffect(() => {
        console.log(totalCalls);
    }, [totalCalls])

    return (
        <>
            <Dashboard userRole={userRole} />
            <form className=" max-w-md mx-auto" onSubmit={handleSubmit}>
                <ToastContainer userRole={userRole} />
                {/* {message && (
                    <div className={`mt-4 p-2 text-sm rounded-lg ${message.startsWith('Error')
                        ? 'text-red-800 bg-red-100 dark:bg-red-800 dark:text-red-200'
                        : 'text-green-800 bg-green-100 dark:bg-green-800 dark:text-green-200'
                        }`}>
                        {message}
                    </div>
                )} */}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="number"
                        value={totalCalls}
                        onChange={(e) => { setCalls(e.target.value) }}
                        name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="total-calls" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Total Calls Today </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        value={totalCoursesBought}
                        onChange={(e) => { setBought(e.target.value) }}
                        type="number" name="floating_phone" id="total-courses bought" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="total-courses bought" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Total Courses Bought</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        value={totalInterested}
                        onChange={(e) => { setInterested(e.target.value) }} type="number" name="total-interested" id="total-interested" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="total-interested" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Total Interested (or need to follow up)</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={remarks}
                        onChange={(e) => { setRemarks(e.target.value) }} type="text" name="remarks" id="remarks" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="remarks" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Remarks(Optional)</label>
                </div>
                <button type="submit" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </>

    )
}

export default editDmDailyReport