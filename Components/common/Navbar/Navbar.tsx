import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  MdHomeFilled,
  MdOndemandVideo,
  MdGroups,
  MdStorefront
} from "react-icons/md";
import Link from 'next/link';


export const Navbar = () => {
    const [isMobile,setIsMobile]=useState(false);


    useEffect(()=>{
    const ResSize=()=>{
            if(window.innerWidth < 800){
                setIsMobile(true);
            }else{
                setIsMobile(false)
            }
    }
    window.addEventListener('resize',ResSize);

    return ()=>window.removeEventListener('resize',ResSize);

    },[])

  return (
    <nav className='p-5 flex h-24 justify-between items-center bg-white fixed top-0 left-0 right-0 z-50'>
        <div className='flex gap-2 items-center'>
            <Image src="/images/facebook.png" alt='logo' width={50} height={30}></Image>
            <input type='text' placeholder='search' className='bg-gray-300 px-4 h-10 rounded-3xl w-72'></input>
        </div>
        {
            isMobile ? '' :
        <div className='flex gap-16 items-center'>
         <MdHomeFilled className='text-4xl'/>
         <MdOndemandVideo  className='text-4xl'/>
         <MdGroups  className='text-4xl'/>
         <MdStorefront  className='text-4xl'/>

        </div>
        }
      
        <Link href={"./Homepage/UserProfile"}>
            <Image src="/images/default-profile.png" className='rounded-4xl cursor-pointer' alt='logo' width={50} height={30}></Image>
        </Link>
 



    </nav>
  )
}
