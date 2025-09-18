"use client"

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { logout } from '@/lib/auth'

const Navbar = () => {
  const {data:session}=useSession()

  return (
    <nav className='border-b border-gray-200'>
        <div className=' container mx-auto py-4 '>

            <div className='flex items-center justify-between'>
                {/* logo */}
                <Link href="/">
                <div className='flex items-center '>
                    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">👜</h1>
                  <h2 className='scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance'>Job Fire</h2>
                </div>
                  
                </Link>

                <div className='flex items-center space-x-7'>
                   <Link href={"/posts"} className='text-base leading-7 font-medium text-gray-600'>
                    Brows Jobs
                   </Link>
                   {session?(<> <Link href={"/Jobs/post"} className='text-base leading-7 font-medium text-gray-600'>
                    Post Jobs
                   </Link>
                    <Link href={"/dashboard"} className='text-base leading-7 font-medium text-gray-600'>
                    Dashboard
                   </Link>  <Button className="cursor-pointer"onClick={logout}>Logout</Button></>):( <Link href={"/auth/signin"} className='text-base leading-7 font-medium text-orange-500 hover:text-orange-600 transition-colors'>
                    Sing in
                   </Link>)}
                   
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar