"use client"

import React from 'react'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
type childrenProps ={
    children:React.ReactNode;
}
const queryClient = new QueryClient()
export const Queryclientprovider = ({children}:childrenProps) => {
  return (
    <div>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider></div>
  )
}
