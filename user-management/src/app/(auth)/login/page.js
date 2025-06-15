'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { API_LINKS } from '@/config/apiLinks'

import { useRouter } from 'next/navigation';
import logo from '@/assets/images/Dplogo.jpg'
import Logo from '@/assets/images/DpLogo.webp'

export default function LoginPage() {
    const Router = useRouter();


    // const [message, setMessage] = useState('');
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await axios.get('http://localhost:4000/auth/');
    //             const data = res.data.message;
    //             console.log("Fetched data:", data, "Type:", typeof data);
    //             setMessage(typeof data === 'string' ? data : JSON.stringify(data));
    //         } catch (error) {
    //             console.log("Error fetching data:", error);
    //         }
    //     };
    //     fetchData();
    // }, []);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post(API_LINKS.LOGIN, {
                email, password
            }, {
                withCredentials: true
            });
            const roleName = res.data.roleName

            if (roleName === 'ADMIN') {
                Router.push('/dashboard')
            } else if (roleName === 'DIGITAL MARKETER') {
                Router.push('/dashboard')
            } else {
                Router.push('/dashboard/viewReport')
            }


            // const token = res.token;
            // localStorage.clear()
            // const authToken = localStorage.getItem('authToken')
            // localStorage.removeItem('authToken');
            // localStorage.setItem('authToken', token);


            // if (res.status === 200) {
            //     Router.push('/dashboard')
            // }
        } catch (error) {
            setError('Invalid credentials or server error');

        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <Image
                        width={152}
                        height={152}
                        className="mr-2"
                        src={logo}
                        alt="DP Logo"
                    />

                </Link>

                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>

                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>

                            <div className="flex justify-end">
                                <Link href="/forgotPassword" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Forgot password?
                                </Link>
                            </div>


                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Login
                            </button>



                        </form>

                        <p>{error}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
