"use client"
import React from "react"
import { Button } from "./ui/button"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface ApplyButtonProps {
  jobId: string
  alreadyApplied?: boolean
}

const ApplyButton = ({ jobId, alreadyApplied = false }: ApplyButtonProps) => {
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const handleApply = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`/api/jobs/${jobId}/apply`)
      if (res.status === 201) {
        toast.success("Applied successfully")
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          router.push("/auth/signin")
        } else if (error.response?.status === 409) {
          toast.error("You have already applied to this job")
        } else {
          toast.error(error.response?.data || "Something went wrong")
        }
      } else {
        toast.error("Something went wrong")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleApply}
      disabled={loading || alreadyApplied}
      className="bg-gradient-to-r from-indigo-500 to-purple-600"
    >
      {loading ? "Applying..." : alreadyApplied ? "Already Applied" : "Apply"}
    </Button>
  )
}

export default ApplyButton
