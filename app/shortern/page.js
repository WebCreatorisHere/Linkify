"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

const SHORTERN = () => {
    const [url, setUrl] = useState('')
    const [shorturl, setShortUrl] = useState('')
    const [generated, setGenerated] = useState([])
    useEffect(() => {
        
        hello()
    }, [])
    const hello = async()=>{
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/generate`)
        let aa = await a.json()
       setGenerated(aa)
    }

    const generate = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shorturl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };


        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                hello()
                alert(result.message)

                if (!result.error) {
                    setUrl("");
                    setShortUrl("");
                }

            })
            .catch((error) => console.error(error));

    }

    const deletecommand = (deleter)=>{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "shorturl": deleter
        });
        
        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/generate`, requestOptions)
          .then((response) => response.json())
          .then((result) => {alert(result.message)
            hello()
          })
          .catch((error) => console.error(error));
                }
    return (
        <div className='max-w-lg mx-auto my-20 rounded-xl bg-purple-100 p-8'>
            <h1 className='font-bold text-2xl my-4'>Generate your short URLs</h1>
            <div className='flex flex-col gap-3'>
                <input type="text"
                    value={url}
                    className='p-2.5 rounded-lg focus:outline-purple-500'
                    onChange={(e) => {
                        setUrl(e.target.value)
                    }}
                    placeholder="Enter your URL here" />
                <input type="text"
                    value={shorturl}
                    className='p-2.5 rounded-lg focus:outline-purple-500'
                    onChange={(e) => {
                        setShortUrl(e.target.value)
                    }}
                    placeholder="Preferred short URL text" />
                <button onClick={generate} type="button" className="text-white my-1 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800  rounded-lg text-sm px-5 py-2.5 text-center font-bold">Generate</button>

            </div>
            {generated[0] && <div className='links mt-6'>
                <h2 className='font-bold text-2xl my-2'>Generated Links</h2>
                <ul className='flex flex-col  font-bold list-disc relative z-50 px-5'>
                    {generated.map((item)=>{
                        return <li className='flex justify-between items-center' key={item.shorturl}>
                            <Link target='_blank' href={`${process.env.NEXT_PUBLIC_HOST}/${item.shorturl}`}>{`${process.env.NEXT_PUBLIC_HOST}/${item.shorturl}`}</Link>
                            <button onClick={()=>deletecommand(item.shorturl)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><img width={20} src="delete.svg" alt="" /></button>
                            </li>
                    })}
                </ul>
            </div>}
        </div>
    )
}

export default SHORTERN