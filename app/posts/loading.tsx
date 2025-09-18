"use client"
import React from "react"

const SkeletonLoading = () => {
  return (
    <div className="container p-2 mx-auto">
      <div className="flex flex-col space-y-6">
        {/* Title */}
        <div className="h-10 w-1/3 rounded-lg bg-gray-300/60 animate-pulse" />

        {/* Search Bar Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 max-w-6xl mb-5">
          <div className="col-span-4 h-14 rounded-md bg-gray-300/60 animate-pulse" />
          <div className="col-span-1 h-14 rounded-md bg-gray-300/60 animate-pulse" />
          <div className="col-span-1 h-14 rounded-md bg-gray-400/70 animate-pulse" />
        </div>

        {/* Job Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="p-4 border rounded-xl shadow-sm bg-white dark:bg-neutral-900 space-y-3 animate-pulse"
            >
              <div className="h-6 w-2/3 bg-gray-300/70 rounded-md" />
              <div className="h-4 w-1/2 bg-gray-200/70 rounded-md" />
              <div className="h-4 w-3/4 bg-gray-200/70 rounded-md" />
              <div className="h-4 w-1/3 bg-gray-200/70 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoading
