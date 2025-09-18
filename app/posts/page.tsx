"use server";
import EmptyJobsCard from "@/components/EmptyCard";
import { JobCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";

const PostedJobs = async ({
  searchParams,
}: {
  searchParams: Promise<{qu?: string; type?: string }>;
}) => {

  const {qu, type }= await searchParams
  const query= qu as string | undefined
   const typeFilter= type as string | undefined

  const jobs = await prisma.job.findMany({
    where:{
      AND:[
        query? {
          OR:[
            {title:{contains: query,  mode:"insensitive"}},
            {description:{contains: query,  mode:"insensitive"}},
            {locstion:{contains: query,  mode:"insensitive"}},
            {postedBy:{name:{contains: query, mode:"insensitive"}}},
          ]
        }:{

        },
        typeFilter &&typeFilter !=="all-types" ?{type: typeFilter}:{}
      ]
    },
    orderBy: { postedAt: "desc" },
    include: { postedBy: true },
  });
  console.log(jobs);

  if (jobs.length == 0) {
    return <EmptyJobsCard />;
  }
  return (
    <div className="container p-2 mx-auto">
      <div className="flex flex-col space-y-4">
        <h1
          className="scroll-m-20 text-start text-4xl font-extrabold tracking-tight text-balance 
             bg-gradient-to-r from-gray-400 via-gray-600 to-black bg-clip-text text-transparent"
        >
          Find the Job You Want
        </h1>
        <form className="grid grid-cols-1  sm:grid-cols-6 gap-3 max-w-6xl mb-5">
          <Input
            id="title-of-post"
            name="qu"
            className="py-6 col-span-4"
            placeholder="Search jobs title, desc, company, location..."
          />
          <Select name="type" defaultValue="all-types">
            <SelectTrigger className="w-full py-6" id="job-type">
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">All Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>
          <Button className="py-6 rounded-none cursor-pointer text-lg">
            Search
          </Button>
        
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
          {jobs.map((j) => (
            <JobCard
            jobId={j.id}
              key={j.id}
              salary={j.salary}
              location={j.locstion}
              postedAt={j.postedAt}
              description={j.description}
              title={j.title}
              postedBy={j.postedBy}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostedJobs;
