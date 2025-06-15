'use client';
import Dashboard from '@/components/Dashboard';
import { getTokenData } from '@/utils/getTokenData';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import axios from 'axios';
import API_LINKS from '@/config/apiLinks';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const DashBoardPage = () => {
    const router = useRouter();
    const [userRole, setUserRole] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [reports, setReports] = useState([])

    const [viewReport, setViewReport] = useState()

    useEffect(() => {
        const token = getTokenData();
        if (!token) {
            router.push('/login');
        }
        if (token) {
            setUserRole(token.data);
        }
        if (token.data.roleName !== 'ADMIN') {
            router.push('/dashboard/viewReport')
            return;
        }

        const fetchReports = async () => {
            const res = await axios.get(API_LINKS.GET_ALL_DM_REPORT, { withCredentials: true });
            setReports(res.data)



        };

        fetchReports();
    }, []);



    useEffect(() => {



        if (selectedDate) {
            const filteredReport = reports.filter(report => {
                const reportDate = new Date(report.createdAt).toISOString().split('T')[0]

                return reportDate === selectedDate
            })
            setViewReport(filteredReport[0])

        } else {
            setViewReport(reports[0])
            setSelectedDate(reports[0]?.date || '')

        }
    }, [selectedDate, reports])

    //   Graph Data
    const pieData = {
        labels: ['Total Calls', 'Interested', 'Purchased'],
        datasets: [
            {
                data: [viewReport?.totalCalls, viewReport?.totalInterested, viewReport?.totalCoursesBought],
                backgroundColor: ['#f87171', '#86efac', '#93c5fd'],
                borderWidth: 1,
            },

        ],
    };

    const barData = {
        labels: ['Total Calls', 'Interested', 'Purchased'],
        datasets: [
            {
                label: 'Student Metrics',
                data: [viewReport?.totalCalls, viewReport?.totalInterested, viewReport?.totalCoursesBought],
                backgroundColor: ['#f87171', '#86efac', '#93c5fd'],
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false, // crucial for flex resizing
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Student Engagement Breakdown' },
        },
    };
    console.log(userRole);

    return (
        <>
            <Dashboard userRole={userRole} />
            <main className="p-4 sm:ml-64 mt-4">
                {/* Date Picker Section */}
                <div className="mb-4">
                    <div className="bg-gray-900 text-white px-4 py-2 rounded-md w-fit">
                        <label htmlFor="datePicker" className="block mb-1">
                            Select Date:
                        </label>
                        <input
                            type="date"
                            id="datePicker"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-gray-800 text-white px-2 py-1 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Four Medium Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="h-48 bg-red-200 border border-red-400 rounded-md flex flex-col justify-center items-center">
                        <div className="text-xl md:text-2xl">Total Students Calls</div>
                        <div className="text-5xl md:text-6xl font-bold">{viewReport?.totalCalls}</div>
                    </div>
                    <div className="h-48 bg-green-200 border border-green-400 rounded-md flex flex-col justify-center items-center">
                        <div className="text-xl md:text-2xl">Total Interested</div>
                        <div className="text-5xl md:text-6xl font-bold">{viewReport?.totalInterested}</div>
                    </div>
                    <div className="h-48 bg-blue-200 border border-blue-400 rounded-md flex flex-col justify-center items-center">
                        <div className="text-xl md:text-2xl">Total Purchased</div>
                        <div className="text-5xl md:text-6xl font-bold">{viewReport?.totalCoursesBought}</div>
                    </div>
                    <div className="h-48 bg-yellow-200 border border-yellow-400 rounded-md flex flex-col justify-center items-center">
                        <div className="text-xl md:text-2xl">Remarks</div>
                        <div className="text-xl  font-bold">{viewReport?.remarks}</div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[22rem] rounded-md overflow-hidden border border-gray-300">
                    <div className="md:w-1/2 w-full bg-purple-200 border-b md:border-b-0 md:border-r border-gray-400 p-4 flex justify-center items-center">
                        <Pie data={pieData} />
                    </div>
                    <div className="md:w-1/2 w-full bg-pink-200 p-4 flex justify-center items-center">
                        <div className="w-full h-72">
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default DashBoardPage;
