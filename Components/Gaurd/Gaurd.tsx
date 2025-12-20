"use client"

import { AuthContext } from '@/context/context'
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type childrenProps={
    children:React.ReactNode;
}
export default function Layout({children}:childrenProps) {
     const [Isclient,setIsClient]=useState(false);
    const context = useContext(AuthContext);
    const router = useRouter();
     if(!context){
        throw new Error('there is no context');
    }
    const {token}=context;

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsClient(true);

    },[])

  useEffect(() => {
    if (!token) {
      router.push('Login');
    }
  }, [token, router]);

 if(!Isclient) return;


  
  if (!token) return ;
  return (
    <div>{children}</div>
  )
}
