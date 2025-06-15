'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { API_LINKS } from '@/config/apiLinks'
import Dashboard from '@/components/Dashboard';
import { useEffect } from 'react'
import { getTokenData } from '@/utils/getTokenData';

const logoutPage = () => {
    const [userRole, setUserRole] = useState(null)
    const router = useRouter();
    useEffect(() => {
        const token = getTokenData();

        if (token) {
            setUserRole(token.data);
        }
    }, [])

    useEffect(() => {

        document.cookie = 'authToken=; Max-Age=0; path=/  ';


        // Redirect to the homepage or login page after logout
        router.push('/login'); // Change '/login' to wherever you want to redirect

    }, []);
    return (
        <>
            {/* <Dashboard userRole={userRole} /> */}

            <h1>Logging Out</h1>
        </>
    )
}

export default logoutPage