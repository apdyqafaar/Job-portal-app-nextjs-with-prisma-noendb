import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Backpack } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

export default function EmptyJobsCard() {
  return (
    <Card className="mt-10 mx-auto max-w-2xl shadow-md border border-gray-200 dark:border-gray-800">
      <CardHeader className="text-center space-y-3">
         <Link href="/posts"className="rounded-none border-0 px-6 text-base hover:bg-neutral-50 cursor-pointer flex items-center justify-start  hover:text-purple-600 gap-4 transition-colors ">
           <ArrowLeft/> Go back
        </Link>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
          <Backpack className="h-8 w-8" />
        </div>
        <CardTitle className="text-2xl font-bold">
          No Jobs Available
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          It looks like no one has posted a job yet. Be the first one to share an opportunity 
          and help others discover meaningful work.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center text-sm text-muted-foreground">
        Posting a job here can help your company connect with the right talent and 
        give professionals a chance to grow their careers. <br />
        Take the first step and create a job posting today.
      </CardContent>
      <div className="flex justify-center"><Link href={"/Jobs/post"}><Button className=" cursor-pointer animate-bounce bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg rounded-sm py-5 px-4">let`s go to post job!</Button></Link></div>
    </Card>
  )
}
