
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { NextRequest, NextResponse } from "next/server";

export async function POST(  request: NextRequest,
  { params }: { params: { jobId: string } }) {
    
    const session=await auth()
    console.log("session", session)
    
   if(!session?.user || !session.user.id){
        return NextResponse.json("you dont have access, please login",{status:401})
    }

 
    try {
        
        const job= await prisma.job.findUnique({
            where:{id:params.jobId}
        })
        if(!job){
            return NextResponse.json("Job not found",{status:404})
        }
        const Exisitingapplication= await prisma.application.findFirst({where:{jobId:params.jobId, userId:session.user.id}})

        if(Exisitingapplication){
            return NextResponse.json("You have already applied for this job",{status:400})
        }
        const jobApplication= await prisma.application.create({
            data:{
                jobId:params.jobId,
                userId:session.user.id
            }
        })
        revalidatePath("/posts")
        if(job) return NextResponse.json(jobApplication,{status:201})
    } catch (error) {
        console.error("Error creating job",error)
        return new NextResponse("Enternal err", {status:501})
    }
}



export async function GET(req:Request) {
    try {
        const jobs=await prisma.job.findMany({orderBy:{postedAt:"desc"}})
        if(jobs) return NextResponse.json(jobs,{status:201})
    } catch (error) {
        console.error("Error creating job",error)
        return new NextResponse("Enternal err", {status:501})
    }
}