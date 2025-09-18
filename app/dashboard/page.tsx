import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

const dashboard = async() => {

  const session=await auth()
  if(!session){
    redirect("/auth/signin")
  }

  const [applications, postedJobs]=await Promise.all([
    prisma.application.findMany({
      where:{
        userId:session.user.id
      },
      include:{
        job:{
          include:{
            postedBy:true
          }
        }
      },
      orderBy:{
        appliedAt:"desc"
      }
    }),
    prisma.job.findMany({
      where:{
        psotedById:session.user.id
      },
      include:{
         _count:{
          select:{
            application:true
          }
         }
      },
      orderBy:{
        postedAt:"desc"  
      }
    })  
  ])



  console.log(applications, postedJobs)
  return (
    <div className='min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <h2 className='text-xl font-semibold mb-2'>Your Applications</h2>
          {applications.length===0 ? (
            <p>You have not applied to any jobs yet.</p>
          ):(
            <ul className='space-y-2'>
              {applications.map((application)=>(
                <li key={application.id} className='border p-4 rounded'>
                  <h3 className='text-lg font-medium'>{application.job.title}</h3>
                  <p className='text-sm text-gray-600'>Applied on: {application.appliedAt.toLocaleDateString()}</p>
                  <p className='text-sm text-gray-600'>Status: {application.status}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2 className='text-xl font-semibold mb-2'>Jobs You Posted</h2>
          {postedJobs.length===0 ? (
            <p>You have not posted any jobs yet.</p>
          ):(
            <ul className='space-y-2'>
              {postedJobs.map((job)=>(
                <li key={job.id} className='border p-4 rounded'>
                  <h3 className='text-lg font-medium'>{job.title}</h3>
                  <p className='text-sm text-gray-600'>Posted on: {job.postedAt.toLocaleDateString()}</p>
                  <p className='text-sm text-gray-600'>Applications: {job._count.application}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default dashboard