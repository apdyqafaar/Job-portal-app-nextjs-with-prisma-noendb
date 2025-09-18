"use client"

import React from 'react'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

const ApplyButton = ({jobId}:{jobId:string}) => {

    const [error, setError]=React.useState<string |null>(null)
    const [loading, setLoading]=React.useState<boolean>(false)
    
    const handleApply= async()=>{
        setLoading(true)
        setError(null)

        try {
            const res=await axios.post(`/api/jobs/${jobId}/apply`)
            if(res.status===201){
                toast.success("Applied successfully")
            }
            
            // console.log(res)
        } catch (error:any) {
            //   console.log(error)
            if(axios.isAxiosError(error)){
                setError(error.response?.data as string)
                 toast.error(error.response?.data as string)
                if(error.response?.status===401){
                    redirect("/auth/signin")
                }
            }else{
                setError("Something went wrong")
                 toast.error("Something went wrong")
            }
        }finally{
            setLoading(false)
        }
    }

    if(loading){
        return (
            <Button disabled className="bg-gradient-to-r from-indigo-500 to-purple-600">
                Applying...
            </Button>
        )
    }
  return (
    <Button onClick={handleApply} className="bg-gradient-to-r from-indigo-500 to-purple-600">Apply </Button>
  )
}

export default ApplyButton