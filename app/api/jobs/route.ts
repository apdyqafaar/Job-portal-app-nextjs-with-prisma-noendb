
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { NextResponse } from "next/server";
  

export async function POST(req:Request) {
    
    const session=await auth()
    console.log("session", session)
    
   if(!session?.user || !session.user.id){
        return NextResponse.json("you dont have access",{status:401})
    }

 
    try {
        const data=await req.json()
        
        const job= await prisma.job.create({
            data:{
                ...data,
                psotedById:session.user.id
            }
        })
        revalidatePath("/posts")
        if(job) return NextResponse.json(job,{status:201})
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