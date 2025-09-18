import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  jobId: string;
};

export async function POST(
  request: NextRequest,
  context: { params: Promise<Params> } // Fixed typo: arams → params
) {
  try {
    // Extract params from context
    const params = await context.params;
    const session = await auth();
    
    if (!session?.user || !session.user.id) {
      return NextResponse.json(
        { error: "You don't have access, please login" },
        { status: 401 }
      );
    }

    const job = await prisma.job.findUnique({
      where: { id: params.jobId } // Now using params.jobId
    });
    
    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }
    
    const existingApplication = await prisma.application.findFirst({
      where: { jobId: params.jobId, userId: session.user.id }
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 400 }
      );
    }
    
    const jobApplication = await prisma.application.create({
      data: {
        jobId: params.jobId,
        userId: session.user.id
      }
    });
    
    revalidatePath("/posts");
    return NextResponse.json(jobApplication, { status: 201 });
  } catch (error) {
    console.error("Error creating application", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}