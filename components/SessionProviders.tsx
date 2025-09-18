"use client"

import { SessionProvider } from "next-auth/react"

interface Props {
  children: React.ReactNode
  session:any 
}

export default function CustomSessionProvider({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
