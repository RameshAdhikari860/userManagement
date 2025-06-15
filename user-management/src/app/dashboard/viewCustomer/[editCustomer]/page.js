'use client'
import Dashboard from '@/components/Dashboard'
import API_LINKS from '@/config/apiLinks';
import { getTokenData } from '@/utils/getTokenData';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';


const editCustomer = () => {
    const params = useParams();
    const router = useRouter()
    const customerId = params.editCustomer
    console.log(customerId);

    const [count, setCount] = useState(1);
    const [courses, setCourses] = useState([''])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [remarks, setRemarks] = useState("");
    const [condition, setCondition] = useState()
    const [userRole, setUserRole] = useState(null);


    useEffect(() => {
        const token = getTokenData();
        if (token) {
            setUserRole(token.data)
        }



        const fetchCustomer = async () => {
            const res0 = await axios.get(API_LINKS.GET_CUSTOMER_BY_ID(customerId), { withCredentials: true })
            // console.log("customer response", res0);
            setName(res0.data.name);
            setEmail(res0.data.email);
            setPhone(res0.data.phone);
            setAddress(res0.data.address);
            setRemarks(res0.data.remarks);
            setCourses(res0.data.courses);
            setCount(courses.length);

            setCondition(res0.data.condition)

        }
        fetchCustomer()


    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {

            const res = await axios.post(API_LINKS.UPDATE_CUSTOMER(customerId), { name, email, phone, address, remarks, courses, condition }, { withCredentials: true })
            // console.log("this is response", res);

            //  Reset all states
            // setName("");
            // setEmail("");
            // setPhone("");
            // setAddress("");
            // setRemarks("");
            // setCourses(['']);
            // setCount(1);

            toast.success("Successfully added Customer", { autoClose: 1000 })

            router.push('/dashboard/viewCustomer')
        } catch (error) {
            toast.error("Error occurred !", { autoClose: 1000 })
            if (error.response) {
                console.error('Server error:', error.response.data);

            } else if (error.request) {
                console.error('No response from server:', error.request);

            } else {
                console.error('Error setting up request:', error.message);

            }
        }
    }


    const addInputField = () => {
        setCount(count + 1)
        setCourses([...courses, ''])
    }
    const removeInputField = () => {
        if (count > 1) {

            setCount(count - 1)
        }
    }

    const handleInputChange = (index, value) => {
        const updatedInputs = [...courses]
        updatedInputs[index] = value
        setCourses(updatedInputs)

    }

    const handleConditionChange = (e) => {
        setCondition(e.target.value)
    }

    return (

        <>
            <Dashboard userRole={userRole} />

            <form className="max-w-sm mx-auto " onSubmit={handleSubmit}>
                <ToastContainer />
                {/* {message && (
                    <div className={`mt-4 p-2 text-sm rounded-lg ${message.startsWith('Error')
                        ? 'text-red-800 bg-red-100 dark:bg-red-800 dark:text-red-200'
                        : 'text-green-800 bg-green-100 dark:bg-green-800 dark:text-green-200'
                        }`}>
                        {message}
                    </div>
                )} */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-900 dark:text-white mb-2" >Customer Name  </label>
                    <input type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} id="name" name="name" placeholder="Enter your name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer email</label>
                    <input type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        id="email" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="name@dp.com" />
                </div>
                <div className="mb-5">
                    <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer Number</label>
                    <input type="name"
                        autoComplete="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        id="number" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="98XXXXXXXX" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address(optional)</label>
                    <input type="text"
                        autoComplete="address"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                        id="address" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Itahari,Sunsari " />
                </div>
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className="mb-4">
                        <label
                            htmlFor={`course-${index}`}
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Course {index + 1}
                        </label>
                        <input
                            autoComplete="courses"
                            type="text"
                            id={`course-${index}`}
                            value={courses[index] || ''}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={`Enter courses ${index + 1}`}
                        />
                    </div>
                ))}
                {/* add courses */}

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-4">
                    <button
                        type="button"
                        onClick={removeInputField}
                        className="h-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                        Remove Course
                    </button>

                    <button
                        type="button"
                        onClick={addInputField}
                        className="h-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                        Add Course
                    </button>
                </div>

                {/* add button */}
                <div className='mt-2'>
                    <label htmlFor="countries" className='block mb-2 text-sm font-bold text-gray-900 dark:text-white '>Select status </label>
                    <select className={`bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${condition === 'purchased' ? 'text-green-600' : condition === 'general' ? 'text-orange-500' : 'text-blue-600'}`} value={condition} onChange={handleConditionChange} id="countries">
                        <option className='font-bold text-blue-600' value='general' >General</option>
                        <option className='font-bold text-orange-500' value='interestedToBuy' >Interested to Buy</option>
                        <option className='font-bold text-green-600' value='purchased'>Purchased</option>

                    </select>
                </div>
                <div>
                    <div>
                        <label htmlFor="message" className="mt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Remarks(Required)</label>
                    </div>
                    <div>
                        <textarea
                            name='remarks'
                            autoComplete="remarks"
                            value={remarks}
                            onChange={(e) => { setRemarks(e.target.value) }} id="message" rows="4" className="h-10 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="will talk later, should follow up..."></textarea>
                    </div>
                </div>




                <button type="submit" className="mt-6 w-100 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>


            </form >
        </>






    )
}

export default editCustomer