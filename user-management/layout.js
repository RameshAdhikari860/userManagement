// import React from 'react';
// import Link from 'next/link'
// import Image from 'next/image'
// import Logo from '@/assets/images/Dplogo.jpg'
// import navLinks from '@/constants/navlinks'

// const DashboardLayout = ({ children }) => {
//     return (
//         <div>
//             {children}
//             <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
//                 <div className="px-3 py-3 lg:px-5 lg:pl-3">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center justify-start rtl:justify-end">
//                             <button
//                                 data-drawer-target="logo-sidebar"
//                                 data-drawer-toggle="logo-sidebar"
//                                 aria-controls="logo-sidebar"
//                                 type="button"
//                                 className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//                             >
//                                 <span className="sr-only">Open sidebar</span>
//                                 <svg
//                                     className="w-6 h-6"
//                                     aria-hidden="true"
//                                     fill="currentColor"
//                                     viewBox="0 0 20 20"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         clipRule="evenodd"
//                                         fillRule="evenodd"
//                                         d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//                                     ></path>
//                                 </svg>
//                             </button>
//                             <Link href="#" className="flex ms-2 md:me-24">
//                                 <Image
//                                     src={Logo}
//                                     height={150}
//                                     width={70}
//                                     className="h-8 me-3"
//                                     alt="Logo"
//                                 />
//                                 <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
//                                     Dashboard
//                                 </span>
//                             </Link>
//                         </div>
//                         {/* <div className="flex items-center">
//                             <div className="flex items-center ms-3">
//                                 <div>
//                                     <button
//                                         type="button"
//                                         className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
//                                         aria-expanded="false"
//                                         data-dropdown-toggle="dropdown-user"
//                                     >
//                                         <span className="sr-only">Open user menu</span>
//                                         <img
//                                             className="w-8 h-8 rounded-full"
//                                             src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
//                                             alt="user"
//                                         />
//                                     </button>
//                                 </div>
//                                 <div
//                                     className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600"
//                                     id="dropdown-user"
//                                 >
//                                     <div className="px-4 py-3" role="none">
//                                         <p className="text-sm text-gray-900 dark:text-white" role="none">
//                                             Neil Sims
//                                         </p>
//                                         <p
//                                             className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
//                                             role="none"
//                                         >
//                                             neil.sims@flowbite.com
//                                         </p>
//                                     </div>
//                                     <ul className="py-1" role="none">
//                                         <li>
//                                             <Link
//                                                 href="#"
//                                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
//                                                 role="menuitem"
//                                             >
//                                                 Dashboard
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link
//                                                 href="#"
//                                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
//                                                 role="menuitem"
//                                             >
//                                                 Settings
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <a
//                                                 href="#"
//                                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
//                                                 role="menuitem"
//                                             >
//                                                 Sign out
//                                             </a>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div> */}
//                     </div>
//                 </div>
//             </nav>

//             <aside
//                 id="logo-sidebar"
//                 className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
//                 aria-label="Sidebar"
//             >
//                 <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
//                     <ul className="space-y-2 font-medium">
//                         {/* Add your sidebar links here */}


//                         {navLinks.map((navLink, index) => {
//                             return (
//                                 <li key={index}>
//                                     <Link
//                                         href={navLink.route}
//                                         className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//                                     >
//                                         <span className="ms-3">{navLink.label}</span>
//                                     </Link>
//                                 </li>)
//                         })}



//                         <li>
//                             <Link
//                                 href="#"
//                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//                             >
//                                 <span className="ms-3">Products</span>
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//             </aside>

//             {/* <main className="p-4 sm:ml-64">
//                 <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
//                     <div className="grid grid-cols-3 gap-4 mb-4">
//                         <div className="flex items-center justify-center h-24 rounded-sm bg-gray-50 dark:bg-gray-700">
//                             <span className="text-sm text-gray-500 dark:text-gray-400">Welcome, Lord</span>
//                         </div>
//                     </div>
//                 </div>
//             </main> */}
//         </div>
//     );
// };

// export default DashboardLayout;
