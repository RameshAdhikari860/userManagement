'use client'
import Dashboard from '@/components/Dashboard'
import API_LINKS from '@/config/apiLinks';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { getTokenData } from '@/utils/getTokenData'

const AddReport = () => {
    const router = useRouter();
    const [count, setCount] = useState(1);
    const [tasks, setTask] = useState(['']);
    const [remarks, setRemarks] = useState('');
    const [userRole, setUserRole] = useState(null);



    // read cookie here the cookie is authToken 
    useEffect(() => {
        const tokenData = getTokenData();
        if (!tokenData || tokenData.data.roleName === 'DIGITAL MARKETER') {
            router.push('/login');
        }
        if (tokenData) {
            setUserRole(tokenData.data)
        }
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log(tasks, remarks);
            const res = await axios.post(API_LINKS.CREATE_USER_REPORT, { tasks, remarks }, { withCredentials: true });
            if (res.status === 200) {


                setCount(1)
                setTask([''])
                setRemarks('')


                toast.success("Success", {
                    autoClose: 1000, // 1 second
                });

                router.push('/dashboard/addReport');
            }
        } catch (error) {
            toast.error("Error occurred empty task!", {
                autoClose: 1000, // 1 second
            });

        }
    };

    const addInputField = () => {
        setCount(count + 1);
        setTask([...tasks, '']);
    };

    const removeInputField = () => {
        if (count > 1) {
            setCount(count - 1);
            setTask(tasks.slice(0, -1));
        }
    };

    const handleInputChange = (index, value) => {
        const updatedInputs = [...tasks];
        updatedInputs[index] = value;
        setTask(updatedInputs);
    };

    return (
        <>
            <Dashboard userRole={userRole} />
            <form className="max-w-sm mx-auto " onSubmit={handleSubmit}>
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className="mb-4">
                        <label
                            htmlFor={`task-${index}`}
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Task {index + 1}
                        </label>
                        <ToastContainer />
                        <input
                            type="text"
                            id={`task-${index}`}
                            value={tasks[index] || ''}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={`Enter task ${index + 1}`}
                        />
                    </div>
                ))}

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-4">
                    <button
                        type="button"
                        onClick={removeInputField}
                        className="h-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                        Remove Task
                    </button>

                    <button
                        type="button"
                        onClick={addInputField}
                        className="h-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                        Add Task
                    </button>
                </div>

                <div>
                    <label
                        htmlFor="small-input"
                        name='remarks'
                        className="block mt-6 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Remarks(optional)
                    </label>
                    <input
                        type="text"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        id="small-input"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="mt-6 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>

                    {/* {message && (
                        <div className={`mt-4 p-2 text-sm rounded-lg ${message.startsWith('Error')
                            ? 'text-red-800 bg-red-100 dark:bg-red-800 dark:text-red-200'
                            : 'text-green-800 bg-green-100 dark:bg-green-800 dark:text-green-200'
                            }`}>
                            {message}
                        </div>
                    )} */}
                </div>
            </form>
        </>
    );
};

export default AddReport;
