"use client"
import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
import { useState } from "react";
import iziToast from "izitoast";

const poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight:"100 900",
});

export default function Home() {
  const [comment , setcomment] = useState()
  return (
   <main>
    <section className="grid bg-purple-100 px-4 h-[60vh] grid-cols-2">
    <div className=" flex flex-col gap-5 items-center justify-center">
      <p className={`font-bold text-3xl ${poppins.className}`}>The best URL shortner in the Market.</p>
      <p className="font-medium text-center px-16">We are the most straight forward URL shortner in the world ever. Our service is designed to be simple and efficient, allowing you to shorten URLs quickly and easily and efficiently by this amazing thing.</p>
      <div className='flex items-center gap-4'>
          <Link href={"/shortern"} className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 rounded-lg text-sm px-5 py-2.5 text-center font-bold">Try Now!</Link>
          <Link href={"https://github.com/WebCreatorisHere"} className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-semibold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30"><svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" /></svg>Github</Link>
        </div>
    </div>
    <div className="relative flex justify-center">
      <Image src={"/vector.avif"} fill={true} alt="an image of a vector"/>
    </div>
    </section>

    <section className="bg-purple-100 h-[60vh]">
      <h1 className="font-extrabold text-3xl text-center pt-4">Leave a Comment..</h1>
      
<div className="w-1/2 mx-auto my-10">
   <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
       <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
           <label htmlFor="comment" className="sr-only">Your comment</label>
           <textarea onChange={(e)=>{setcomment(e.target.value)}} value={comment} id="comment" rows="4" className="w-full px-0 text-sm focus:outline-none text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
       </div>
       <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
           <button onClick={async()=>{if(comment != ""){const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "comment": comment
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/api/savecomment", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
  setcomment("")
  iziToast.success({
    title: 'Success',
    message: "Your comment has been posted",
})}
else{
  iziToast.error({
    title: 'Error',
    message: "Please enter a comment",
  })
}
  }} className="inline-flex items-center mx-auto py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Post comment
           </button>
           
       </div>
   </div>
<p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>
</div>

    </section>
    <footer className="flex justify-between items-center bg-black p-5 px-10">
      <h2 className="font-bold text-2xl text-white">Linkify</h2>
      <p className="text-white text-sm font-medium">© 2023 Flowbite™. All Rights Reserved.</p>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-gray-400 sm:mt-0">
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
}
