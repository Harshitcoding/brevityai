
'use client'
import Link from "next/link"
import { Button } from "./ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useEffect, useState } from "react"
import { Hand, Loader, LogOut } from 'lucide-react';
import Image from "next/image"
const Header = () => {
  const [initialLoading, setInitialLoading] = useState<boolean>(true)

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      setInitialLoading(false)
    }
  }, [status, session])

  return (
    <div className="fixed top-0 w-full h-[60px] bg-black border-b  border-white/60 p-3 flex justify-between items-center z-50">
      <Link href="/">
        <h2 className=" text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          <Image src="/liva.png" alt="logo" width={50} height={50}/>
        </h2>
      </Link>
      {initialLoading && status === 'loading' ? <Loader className="animate-spin" /> : !session ? <div className="__menu">
        <Button onClick={() => signIn("google")}>Login</Button>
      </div> : (
        <div className="flex gap-3 justify-center items-center">
            <Link href="/create">
            <Button>
                Summary
            </Button>
            </Link>
          <Button onClick={()=>signOut()} variant="destructive">
            <div className="gap-2 flex justify-center items-center">
            Logout<LogOut/>
            </div>
          </Button>
        <Link href="/profile">
        <Avatar>
          <AvatarImage src={session.user?.image || ""} />
          <AvatarFallback><Hand/></AvatarFallback>
        </Avatar>
        </Link>
        </div>
      )}
    </div> 
  )
}
export default Header
