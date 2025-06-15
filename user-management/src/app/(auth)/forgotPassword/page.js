// pages/forgot-password.js
'use client'
import API_LINKS from '@/config/apiLinks';
import axios from 'axios';
import React, { useState } from 'react';

const ForgotPassword = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');


    const handleSubmit = async () => {
        // const res = await axios.post(API_LINKS.FORGOT_PASSWORD(email))
        console.log(email);
    }
    function trial(params) {
        console.log(email);
    }
    return (

        <>

            <div className={isSubmitting ? `fixed inset-0 backdrop-blur-[2px] bg-[#0000008c] z-50` : ''}>{isSubmitting && 'Sending Otp'}</div >
            {/* // <div className={isSubmitting ? `fixed inset-0 backdrop-blur-[2px] bg-[#0000008c] z-50` : ''}>
            //     Sending OTP...
            // </div> */}

            <form className="max-w-sm mx-auto mt-10" onSubmit={handleSubmit}>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}

                    onChange={e => setEmail(e.target.value)}
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    required
                />
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className={`mt-4 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isSubmitting && 'bg-gray-500 hover:bg-gray-800'}`}
                >
                    Send OTP
                </button>
                <p
                    id="helper-text-explanation"
                    className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                >
                    Well never share your details. Read our{' '}Privacy Policy
                </p>


            </form>
        </>
    );
};

export default ForgotPassword;
