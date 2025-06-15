'use client'
import Dashboard from '@/components/Dashboard'
import API_LINKS from '@/config/apiLinks'
import { getTokenData } from '@/utils/getTokenData'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const viewCustomer = () => {
    const token = getTokenData();

    const [userRole, setRole] = useState();
    const [customers, setCustomers] = useState([]);
    const [selectedDate, setSelectedDate] = useState()

    const [filteredCustomers, setFilteredCustomers] = useState([]);

    const router = useRouter()

    useEffect(() => {


        if (!token || (token.data.roleName !== 'DIGITAL MARKETER' && token.data.roleName !== 'ADMIN')) {
            router.push('/login')
            return;
        }
        setRole(token.data)

        const fetchData = async () => {
            const res = await axios.get(API_LINKS.GET_ALL_CUSTOMER, { withCredentials: true })
            console.log("response : ", res.data);
            setCustomers(res.data)

        }
        fetchData();

    }, [])

    useEffect(() => {
        if (!selectedDate) {
            console.log("i ran");
            setFilteredCustomers(customers)
            return
        }
        console.log('u ran');
        const filteredCustomers = customers.filter(customer => {
            const customerDate = new Date(customer.createdAt).toISOString().split('T')[0]
            return customerDate === selectedDate
        })

        setFilteredCustomers(filteredCustomers)

    }, [selectedDate, customers]);

    return (
        <>

            <div className=" lg:ml-60" >
                <Dashboard userRole={userRole} />
                <div className="bg-gray-100 min-h-screen py-8 px-4">
                    <div className="container mx-auto">
                        <h1 className="text-3xl font-bold text-center  text-gray-800 mb-8"> Students</h1>

                        {/* Search and Add User */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                            <div className="w-full md:w-1/3 mb-4 md:mb-0">

                            </div>
                            {/* <a href="https://abhirajk.vercel.app/" target="_blank" rel="noopener noreferrer">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                                    Add New User
                                </button>
                            </a> */}
                            <div className="bg-gray-900 text-white px-4 py-2 rounded-md">
                                <label htmlFor="datePicker" className="block mb-1">Select Date:</label>
                                <input
                                    type="date"
                                    id="datePicker"
                                    value={selectedDate || ''}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="bg-gray-800 text-white px-2 py-1 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                        </div>

                        {/* User Table */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow">

                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">Email</th>
                                        <th className="py-3 px-6 text-left">Phone</th>
                                        <th className="py-3 px-6 text-left">Courses</th>
                                        <th className="py-3 px-6 text-left">condition</th>
                                        <th className="py-3 px-6 text-left">Remarks</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm">
                                    {/* Sample row (repeat or map through user data) */}
                                    {filteredCustomers.map((customer, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">

                                            {/* <td className="py-3 px-6 text-left">
                                                {new Date(report.createdAt).toISOString().slice(0, 10)} / {new Date(report.createdAt).toTimeString().slice(0, 5)}
                                            </td> */}

                                            {/* <td className="py-3 px-6 text-left">{report.createdAt}</td> */}
                                            <td className="py-3 px-6  text-left">{customer.name}</td>
                                            <td className="py-3 px-6 text-left">{customer.email}</td>
                                            <td className="py-3 px-6 text-left">{customer.phone}</td>
                                            <td className="py-3 px-6 text-left">{customer.courses}</td>
                                            <td className={`py-3 px-6 font-bold text-left ${customer.condition === 'purchased' ? 'text-green-600' :
                                                customer.condition === 'interestedToBuy' ? 'text-orange-500' :
                                                    'text-blue-600'
                                                }`}>
                                                {customer.condition}
                                            </td>


                                            <td className="py-3 px-6 text-left">{customer.remarks}</td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center">
                                                    <Link href={`/dashboard/viewCustomer/${customer._id}`}>
                                                        <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M16.732 3.732L3 17.964v3.572h3.5L20.768 6.768a2.5 2.5 0 10-3.536-3.536z" />
                                                            </svg>
                                                        </button>
                                                    </Link>
                                                    {/* <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7L5 7m0 0l.867 12.142A2 2 0 007.862 21h8.276a2 2 0 001.995-1.858L19 7zm-5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3" />
                                                        </svg>
                                                    </button> */}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-6">
                            <span className="text-sm text-gray-700">Showing 1 to 5 of 5 entries</span>
                            <div className="flex space-x-2">
                                <a href="https://abhirajk.vercel.app/" target="_blank" rel="noopener noreferrer">
                                    <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 opacity-50">Previous</button>
                                </a>
                                <a href="https://abhirajk.vercel.app/" target="_blank" rel="noopener noreferrer">
                                    <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 opacity-50">Next</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div >
            </div >


        </>
    )
}

export default viewCustomer