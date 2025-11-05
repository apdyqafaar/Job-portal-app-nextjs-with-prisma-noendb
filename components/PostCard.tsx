"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Label } from "./ui/label"
import ApplyButton from "./ApplyButton"

interface JobCardProps {
  thumbnail?: string
  title: string
  description: string
  postedBy: any,
  postedAt:Date,
  location:string,
  salary:any
  jobId:string
}

export function JobCard({ thumbnail, title, description, postedBy,postedAt, location,salary, jobId }: JobCardProps) {
    const [isPostView, setIsPoview]=useState(false)
  return (
     <>
    <Card className="shadow-md hover:shadow-lg transition rounded-xl border border-gray-200 dark:border-gray-800">
      {/* Thumbnail / Header */}
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold line-clamp-1">{title}</h2>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={postedBy.image} />
          <AvatarFallback>{postedBy.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{postedBy.name}</span>
          <span className="text-xs text-muted-foreground">Posted this job</span>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between">
        <Button onClick={()=>setIsPoview(!isPostView)} variant="outline" className="rounded-none border-0 px-6 text-base hover:bg-neutral-50 cursor-pointer flex items-center hover:gap-4 transition-all">
          View <ArrowRight/>
        </Button>
        {/* <Button className="rounded-full px-6 bg-indigo-600 hover:bg-indigo-700">
          Apply
        </Button> */}
         <ApplyButton jobId={jobId}/>
      </CardFooter>
    </Card>
   
    

    <Dialog onOpenChange={setIsPoview} open={isPostView} >
        
  <DialogContent className="w-3xl" >
     {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            className="h-[200px] w-16 rounded object-cover border"
          />
        ) : (
          <div className="h-[200px] rounded bg-gradient-to-r from-indigo-200 to-purple-300 w-full my-4" />
        )}
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>
      {description}
      </DialogDescription>

         <div className="flex flex-col mt-4">
        <Label className="text-sm text-gray-400">Location:</Label>
        <span className="text-sm font-medium">{location}</span>
      
      </div>
        <div className="flex flex-col">
        <Label className="text-sm text-gray-400">salary:</Label>
        <span className="text-sm font-medium">${salary}</span>
      
      </div>


      <div className="flex flex-col">
        <Label className="text-sm text-gray-400">Posted by:</Label>
        <div className="flex items-center justify-between flex-wrap">
            <div  className="flex items-center gap-3">
             <Avatar>
          <AvatarImage src={postedBy.image} />
          <AvatarFallback>{postedBy.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{postedBy.name}</span>
          <span className="text-xs text-muted-foreground">Posted this job</span>
        </div>
        </div>


        <Label>{postedAt.toLocaleDateString()}</Label>
        </div>
      </div>
    </DialogHeader>
      <ApplyButton jobId={jobId}/>
  </DialogContent>
</Dialog>
    </>
  )
}
