"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';


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
        <main className=''>
        <div style={{boxShadow:"0px 0px 1000px 100px #e91e634f"}} className='max-w-lg m-10 mx-auto my-20 rounded-xl bg-purple-100 p-8 max-[548px]:p-4 max-[548px]:mx-4'>
            <h1 className='font-bold max-[430px]:text-xl text-[#8d21bf] text-2xl my-4'>Generate your short URLs</h1>
            <div className='flex flex-col gap-3'>
                <input
                    type="text"
                    value={url}
                    className='p-2.5 rounded-lg placeholder:text-[#8d21bfa2] focus:outline-purple-500'
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter your URL here"
                />
                <input
                    type="text"
                    value={shorturl}
                    className='p-2.5 rounded-lg placeholder:text-[#8d21bfa3] focus:outline-purple-500'
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
        <footer className="flex  max-[430px]:px-4 justify-between absolute bottom-0 w-full items-center bg-black p-5 px-10">
      <h2 className="font-bold  max-[430px]:text-xl text-2xl text-white">Linkify</h2>
      <p className="text-white  max-[430px]:text-xs text-sm font-medium">© 2023 Flowbite™. All Rights Reserved.</p>
      <ul className="flex flex-wrap max-[800px]:hidden items-center mt-3 text-sm font-medium text-white dark:text-gray-400 sm:mt-0">
        <li>
            <a target="_blank" href={`${process.env.NEXT_PUBLIC_HOST}/about`} className="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
            <a target="_blank" href={`${process.env.NEXT_PUBLIC_HOST}/shortern`}  className="hover:underline me-4 md:me-6">Shortern</a>
        </li>
        <li>
            <a target="_blank" href="https://www.github.com/WebCreatorishere" className="hover:underline me-4 md:me-6">Github</a>
        </li>
        <li>
            <a target="_blank" href={`${process.env.NEXT_PUBLIC_HOST}/shprtern`}  className="hover:underline">Contact Us</a>
        </li>
    </ul>
    </footer>
        </main>
    );
};

export default SHORTERN;
