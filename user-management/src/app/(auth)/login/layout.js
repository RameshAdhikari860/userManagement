import React from 'react';

export default function LoginLayout({ children }) {
    return (
        <div style={{ padding: '2rem', border: '1px solid #ccc' }}>
            {children}
        </div>
    );
}