"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import iziToast
const iziToast = dynamic(() => import('izitoast'), { ssr: false });

const SHORTERN = () => {
    const [url, setUrl] = useState('');
    const [shorturl, setShortUrl] = useState('');
    const [generated, setGenerated] = useState([]);
    const [iziToast, setIziToast] = useState(null)

    useEffect(() => {
        const loadIziToast = async () => {
            const iziToastModule = (await import('izitoast')).default;
            setIziToast(iziToastModule);
        };
        loadIziToast()
        hello();
    }, []);

    const hello = async () => {
        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/generate`);
            let data = await response.json();
            setGenerated(data);
        } catch (error) {
            console.error('Error fetching generated URLs:', error);
        }
    };

    const generate = async () => {
        if (url === '' || shorturl === '') {
            iziToast.error({
                title: 'Error',
                message: 'URL is required!',
            });
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, shorturl }),
        };

        try {
            let response = await fetch("/api/generate", requestOptions);
            let result = await response.json();
            if (result.error) {
                iziToast.error({
                    title: 'Error',
                    message: result.message,
                });
            } else {
                setUrl('');
                setShortUrl('');
                iziToast.success({
                    title: 'Success',
                    message: result.message,
                });
                hello();
            }
        } catch (error) {
            console.error('Error generating URL:', error);
        }
    };

    const deletecommand = async (deleter) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ shorturl: deleter }),
        };

        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/generate`, requestOptions);
            let result = await response.json();
            if (result.error) {
                iziToast.error({
                    title: 'Error',
                    message: result.message,
                });
            } else {
                iziToast.success({
                    title: 'Success',
                    message: result.message,
                });
                hello();
            }
        } catch (error) {
            console.error('Error deleting URL:', error);
        }
    };

    return (
        <div className='max-w-lg mx-auto my-20 rounded-xl bg-purple-100 p-8'>
            <h1 className='font-bold text-2xl my-4'>Generate your short URLs</h1>
            <div className='flex flex-col gap-3'>
                <input
                    type="text"
                    value={url}
                    className='p-2.5 rounded-lg focus:outline-purple-500'
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter your URL here"
                />
                <input
                    type="text"
                    value={shorturl}
                    className='p-2.5 rounded-lg focus:outline-purple-500'
                    onChange={(e) => setShortUrl(e.target.value)}
                    placeholder="Preferred short URL text"
                />
                <button
                    onClick={generate}
                    type="button"
                    className="text-white my-1 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 rounded-lg text-sm px-5 py-2.5 text-center font-bold"
                >
                    Generate
                </button>
            </div>
            {generated[0] && (
                <div className='links mt-6'>
                    <h2 className='font-bold text-2xl my-2'>Generated Links</h2>
                    <ul className='flex flex-col font-bold list-disc relative z-50 px-5'>
                        {generated.map((item) => (
                            <li className='flex justify-between items-center' key={item.shorturl}>
                                <Link target='_blank' href={`${process.env.NEXT_PUBLIC_HOST}/${item.shorturl}`}>
                                    {`${process.env.NEXT_PUBLIC_HOST}/${item.shorturl}`}
                                </Link>
                                <button
                                    onClick={() => deletecommand(item.shorturl)}
                                    type="button"
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                    <img width={20} src="delete.svg" alt="" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SHORTERN;
