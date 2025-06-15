'use client';
import Dashboard from '@/components/Dashboard'
import API_LINKS from '@/config/apiLinks';
import { getTokenData } from '@/utils/getTokenData';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';


const dailyReport = () => {
    const router = useRouter();

    const [totalCalls, setCalls] = useState('');
    const [totalCoursesBought, setBought] = useState("");
    const [totalInterested, setInterested] = useState('');
    const [remarks, setRemarks] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userRole, setUserRole] = useState(null);


    useEffect(() => {
        const tokenData = getTokenData();
        if (!tokenData || (tokenData.data.roleName !== 'DIGITAL MARKETER' && tokenData.data.roleName !== 'ADMIN')) {
            router.push('/login');
            return;
        }

        if (tokenData) {
            setUserRole(tokenData.data);
        }

    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true)
            const res = await axios.post(API_LINKS.CREATE_DM_REPORT, { totalCalls, totalCoursesBought, totalInterested, remarks }, { withCredentials: true })

            console.log("i ran");

            // to initial conditions
            setCalls('');
            setBought("");
            setInterested("");
            setRemarks("");


            toast.success("Successfully added report")
            console.log("success");
            setTimeout(() => {
                router.push("/dashboard/viewDailyReport")
            }, 5000)
        } catch (error) {

            toast.error("Error occurred " + error.response.data)

        } finally {
            setTimeout(() => {
                setIsSubmitting(false)

            }, 5000);
        }
    }




    return (
        <>
            <Dashboard userRole={userRole} />
            {isSubmitting && <div className='fixed inset-0 bg-[#0000008c] z-50 backdrop-blur-[2px]'></div>}

            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <ToastContainer userRole={userRole} />

                {/* Total Calls Today */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="number"
                        value={totalCalls}
                        onChange={(e) => setCalls(e.target.value)}
                        name="totalCalls"
                        id="totalCalls"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="totalCalls"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Total Calls Today
                    </label>
                </div>

                {/* Total Courses Bought */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="number"
                        value={totalCoursesBought}
                        onChange={(e) => setBought(e.target.value)}
                        name="totalCoursesBought"
                        id="totalCoursesBought"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="totalCoursesBought"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Total Courses Bought
                    </label>
                </div>

                {/* Total Interested */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="number"
                        value={totalInterested}
                        onChange={(e) => setInterested(e.target.value)}
                        name="totalInterested"
                        id="totalInterested"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="totalInterested"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Total Interested (or need to follow up)
                    </label>
                </div>

                {/* Remarks */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        name="remarks"
                        id="remarks"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="remarks"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Remarks (Optional)
                    </label>
                </div>

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${isSubmitting && 'bg-gray-800 '} `}
                >
                    {isSubmitting ? 'Submitting' : 'Submit'}
                </button>
            </form>


        </>

    )
}

export default dailyReport