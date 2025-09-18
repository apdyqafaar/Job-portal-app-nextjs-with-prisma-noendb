"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { FormEvent, useState } from 'react'
import axios from "axios"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { auth } from '@/auth'


const PostJobs = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false) // Fixed typo: 'loadind' -> 'loading'

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      locstion: formData.get("location") as string,
      type: formData.get("jobType") as string,
      description: formData.get("description") as string,
      salary: formData.get("salary") as string,
    }

    try {
      const res = await axios.post("/api/jobs", data)
    
      if (res.status === 201) {
        router.push("/posts")
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        window.location.href = "/auth/signin";
        
        console.error("Error creating job:", error);
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='p-2'>
      <form onSubmit={handleSubmit} className='max-w-2xl mx-auto py-4 md:py-9 h-full'>
        <h1 className="scroll-m-20 text-start text-4xl font-extrabold tracking-tight text-balance">
          Post a job
        </h1>
        <div className="flex flex-col space-y-6 my-6.5 h-full">
          <div className="grid gap-2">
            <Label htmlFor="title-of-post">Title</Label>
            <Input
            required
              id="title-of-post"
              name="title"
              className="py-6"
              placeholder="Full-stack-Job"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="company-of-post">Company</Label>
            <Input
             required
              id="company-of-post"
              name="company"
              className="py-6"
              placeholder="Google"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location-of-post">Location</Label>
            <Input
             required
              id="location-of-post"
              name="location"
              className="py-6"
              placeholder="Jigjiga"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="job-type">Job type</Label>
            <Select  required name="jobType">
              <SelectTrigger className="w-full" id="job-type">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <textarea
             required
              id="description"
              name="description"
              placeholder="Type your description here..."
              rows={6}
              maxLength={500}
              className="flex w-full min-h-16 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs 
       transition-[color,box-shadow] outline-none 
       placeholder:text-muted-foreground 
       focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 
       aria-invalid:border-destructive aria-invalid:ring-destructive/20 
       dark:aria-invalid:ring-destructive/40 dark:bg-input/30 
       disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="salary">Salary (optional)</Label>
            <Input
              id="salary"
              name="salary"
              className="py-6"
              placeholder="e.g., $80,000 - $100,000"
            />
          </div>

        </div>
        <Button type='submit' className='w-full rounded-sm py-6'>{loading? <Loader2 className=' animate-spin'/>:"Post job"}</Button>
      </form>
    </div>
  )
}

export default PostJobs