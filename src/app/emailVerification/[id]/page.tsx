"use client";
import React from 'react';

const EmailVerification = ({ params }: { params: { id: string } }) => {
    const { id } = params;

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p className="mb-4 text-center">
                Press the following button to verify your email
            </p>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[350px]" style={{ backgroundColor: '#63C3FE' }}>
                    Verify Email
                </button>
            </div>
        </div>
    );
};

export default EmailVerification;
