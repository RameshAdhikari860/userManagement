'use client'
import React, { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/assets/images/Dplogo.jpg'
import { dmLink, roleLink } from '@/constants/navlinks'
import navLinks from '@/constants/navlinks';
import { usePathname, useRouter } from 'next/navigation';

const Dashboard = ({ userRole }) => {
    const router = useRouter()
    const pathname = usePathname()

    const role = userRole?.roleName
    let nav = 'roleLink'

    if (role === "DIGITAL MARKETER") {
        nav = dmLink
    } else if (role === "ADMIN") {
        nav = navLinks
    } else {
        nav = roleLink
    }

    const handleConfirm = () => {
        const isConfirmed = confirm("Do you want to logout")
        if (isConfirmed) {
            document.cookie = 'authToken=; Max-Age=0; path=/  ';
            router.push('/login')
        }
    }

    // For controlling sidebar toggle state for CSS checkbox hack
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    return (
        <>
            {/* Hidden checkbox to control sidebar toggle */}
            <input
                type="checkbox"
                id="sidebar-toggle"
                className="hidden"
                checked={sidebarOpen}
                onChange={toggleSidebar}
            />
            <h1>hello demo</h1>

            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <label
                            htmlFor="sidebar-toggle"
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                ></path>
                            </svg>
                        </label>
                        <Link href="#" className="flex ms-2 md:me-24">
                            <Image
                                src={Logo}
                                alt="Logo"
                                className="h-10 w-10 me-3"
                            />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                Dashboard
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {nav?.map((navLink, index) => (
                            <li key={index}>
                                {navLink.label === 'Logout' ? (
                                    <div
                                        onClick={handleConfirm}
                                        className={
                                            "flex items-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer " +
                                            (navLink.route === pathname ? "bg-gray-300 dark:bg-gray-700" : "")
                                        }
                                    >
                                        <span className="ms-3">{navLink.label}</span>
                                    </div>
                                ) : (
                                    <Link
                                        href={navLink.route}
                                        className={
                                            "flex items-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group " +
                                            (navLink.route === pathname ? "bg-gray-300 dark:bg-gray-700" : "")
                                        }
                                    >
                                        <span className="ms-3">{navLink.label}</span>
                                    </Link>
                                )}
                            </li>
                        ))}

                    </ul>
                </div>
            </aside>

            {/* Dummy main content placeholder */}
            <main className="pt-20 p-4 sm:ml-64">
                {/* Your dashboard content goes here */}

            </main>

            {/* Responsive CSS for sidebar */}
            <style jsx>{`
                #logo-sidebar {
                    transition: transform 0.3s ease-in-out;
                }

                /* When checkbox is checked, show sidebar on small screens */
                #sidebar-toggle:checked ~ #logo-sidebar {
                    transform: translateX(0);
                }

                /* When sidebar is open, prevent body scroll */
                #sidebar-toggle:checked ~ main {
                    pointer-events: auto;
                }

                /* Hide the checkbox input */
                input[type='checkbox'].hidden {
                    display: none;
                }

                /* On small screens hide main left margin */
                main {
                    transition: margin-left 0.3s ease-in-out;
                }

                @media (min-width: 640px) {
                    #sidebar-toggle {
                        display: none !important;
                    }
                    #logo-sidebar {
                        transform: translateX(0) !important;
                    }
                    main {
                        margin-left: 16rem; /* Width of sidebar */
                    }
                }
            `}</style>
        </>
    );
};

export default Dashboard;
