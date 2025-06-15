'use client'
import React, { useEffect, useState } from 'react'
import Dashboard from '@/components/Dashboard'
import { getTokenData } from '@/utils/getTokenData'
import API_LINKS from '@/config/apiLinks'
import axios from 'axios'

const viewReport = () => {

    const [reports, setReports] = useState([])
    const [userRole, setUserRole] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {

                // token part 
                const token = getTokenData();

                if (!token || (token.data.roleName !== 'DIGITAL MARKETER' && token.data.roleName !== "ADMIN")) {
                    router.push('/login');
                }
                // console.log("token data is", token.data);
                if (token) {
                    setUserRole(token.data)
                }
                // api hit part
                console.log("test", token.data._id);
                const res = await axios.get(API_LINKS.GET_ALL_USER_REPORT, { withCredentials: true })

                setReports(res.data)

            } catch (error) {
                console.error("failed to fetch", error)
            }
        }
        fetchUser();
    }, [])

    return (
        <>
            <div className=" lg:ml-60" >
                <Dashboard userRole={userRole} />
                <div className="bg-gray-100 min-h-screen py-8 px-4">
                    <div className="container mx-auto">
                        <h1 className="text-3xl font-bold text-center mb-8">User Listing</h1>

                        {/* Search and Add User */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                            <div className="w-full md:w-1/3 mb-4 md:mb-0">

                            </div>

                        </div>

                        {/* User Table */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="  bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Date</th>
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">Task</th>
                                        <th className="py-3 px-6 text-left">Remarks</th>
                                        {/* <th className="py-3 px-6 text-center">Actions</th> */}
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm">
                                    {/* Sample row (repeat or map through user data) */}
                                    {reports.map((report, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">

                                            <td className="py-3 px-6 text-left">
                                                {new Date(report.createdAt).toISOString().slice(0, 10)} / {new Date(report.createdAt).toTimeString().slice(0, 5)}
                                            </td>


                                            <td className="py-3 px-6 text-left">{report.createdBy}</td>
                                            <td className="py-3 px-6 text-left">{report.task}</td>
                                            <td className="py-3 px-6 text-left">{report.remarks}</td>
                                            {/* <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center">
                                                    <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M16.732 3.732L3 17.964v3.572h3.5L20.768 6.768a2.5 2.5 0 10-3.536-3.536z" />
                                                        </svg>
                                                    </button>
                                                    <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7L5 7m0 0l.867 12.142A2 2 0 007.862 21h8.276a2 2 0 001.995-1.858L19 7zm-5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}

                    </div>
                </div >
            </div >
        </>




    )
}

export default viewReport